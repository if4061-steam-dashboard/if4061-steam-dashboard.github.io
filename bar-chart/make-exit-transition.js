function makeExitTransition(previousState) {
    const keyframeList = calculateKeyframes(previousState);
    keyframeList.forEach(keyframe => {
        const id = keyframe.label.replace(/[^a-z0-9]+/gi, "");
        const barArea = barChart.select(`g[bar-id='${id}']`);
        const barAreaSize = barArea.size();
        if (barAreaSize >= 1) {
            if (barAreaSize > 1) {
                console.warn("Warning: unhandled duplicate bar-id");
            }
            barArea.select("rect")
                .transition()
                .attr("width", 0)
                .duration(barChartConfig.transitionDuration);

            const barLabel = barArea.select("text");
            barLabel
                .transition()
                .attr("x", barLabel.attr("x") - keyframe.width)
                .attr("opacity", 0)
                .duration(barChartConfig.transitionDuration);

            const barIcon = barArea.select("image");
            barIcon
                .transition()
                .attr("opacity", 0)
                .attr("x", barIcon.attr("x") - keyframe.width)
                .duration(barChartConfig.transitionDuration);
        }
    });

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            barChart.selectAll("g").remove();
            resolve();
        }, barChartConfig.transitionDuration)
    });
}

// setTimeout(() => {
//     makeExitTransition();
// }, 3000);
