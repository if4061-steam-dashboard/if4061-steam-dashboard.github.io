function makeEnterTransition(state) {
    const keyframes = calculateKeyframes(state);
    keyframes.forEach(keyframe => {
        const id = keyframe.label.replace(/[^a-z]+/gi, "");
        const barArea = barChart.append("g")
            .attr("bar-id", id);
        const barRectangle = barArea.append("rect");
        barRectangle
            .attr("width", 0)
            .attr("height", barChartConfig.barHeight)
            .attr("fill", "url(#barGradient)")
            .attr("x", 0)
            .attr("y", keyframe.yPos);

        const barLabel = barArea.append("text");
        barLabel
            .attr("y", keyframe.yPos + barChartConfig.barHeight / 2)
            .attr("opacity", 0)
            .attr("font-size", `${barChartConfig.baseFontSize}px`)
            .attr("text-anchor", "left")
            .attr("dominant-baseline", "middle")
            .text(keyframe.label);

        const barIcon = barArea.append("image");
        barIcon
            .attr("href", keyframe.iconUrl)
            .attr("height", barChartConfig.iconSize)
            .attr("width", barChartConfig.iconSize)
            .attr("y", keyframe.yPos + (barChartConfig.barHeight - barChartConfig.iconSize) / 2)
            .attr("opacity", 0);

        const contentMargin = 10;
        setTimeout(() => {
            const barLabelWidth = barLabel.node().getComputedTextLength();
            const labelXInsidePosition = keyframe.width - barChartConfig.iconContainerWidth - barLabelWidth - contentMargin;
            if (labelXInsidePosition >= 0) {
                barLabel
                    .attr("fill", "black")
                    .attr("x", labelXInsidePosition - keyframe.width)
                    .transition()
                    .attr("x", labelXInsidePosition)
                    .attr("opacity", 1)
                    .duration(barChartConfig.transitionDuration);

                const iconXInsidePosition = keyframe.width - contentMargin - barChartConfig.iconContainerWidth + (barChartConfig.iconContainerWidth - barChartConfig.iconSize) / 2;
                barIcon
                    .attr("x", iconXInsidePosition - keyframe.width)
                    .transition()
                    .attr("x", iconXInsidePosition)
                    .attr("opacity", 1)
                    .duration(barChartConfig.transitionDuration);

            } else {
                barLabel
                    .attr("fill", "white")
                    .attr("x", contentMargin)
                    .transition()
                    .attr("x", contentMargin + keyframe.width)
                    .attr("opacity", 1)
                    .duration(barChartConfig.transitionDuration);

                barIcon
                    .attr("x", 2 * contentMargin + barLabelWidth)
                    .transition()
                    .attr("x", 2 * contentMargin + barLabelWidth + keyframe.width)
                    .duration(barChartConfig.transitionDuration)
                    .attr("opacity", 1);
            }

            barRectangle
                .transition()
                .attr("width", keyframe.width)
                .duration(barChartConfig.transitionDuration);
        }, 250);
    });

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, barChartConfig.transitionDuration + 250)
    });
}
