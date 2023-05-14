function makeExitTransition(previousState) {
    const keyframeList = calculateKeyframes(previousState);
    keyframeList.forEach(keyframe => {
        const id = keyframe.label.replace(/[^a-z]+/gi, "");
        const barArea = barChart.select(`g[bar-id=${id}]`);
        const barAreaSize = barArea.size();
        if (barAreaSize >= 1) {
            if (barAreaSize > 1) {
                console.warn("Warning: unhandled duplicate bar-id");
            }
            barArea.select("rect")
                .transition()
                .attr("width", 0)
                .duration(barChartConfig.transitionDuration);

            barArea.select("text")
                .transition()
                .attr("x", keyframe.labelXPos - keyframe.width)
                .attr("y", keyframe.yPos + barChartConfig.barHeight / 2)
                .attr("opacity", 0)
                .duration(barChartConfig.transitionDuration);

            barArea.select("image")
                .transition()
                .attr("opacity", 0)
                .attr("x", keyframe.iconXPos + (barChartConfig.iconContainerWidth - barChartConfig.iconSize) / 2 - keyframe.width)
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
