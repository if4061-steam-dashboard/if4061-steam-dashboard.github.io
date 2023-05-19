function makeDirectTransition(state) {
    const keyframeList = calculateKeyframes(state);
    const randomId = `${Math.random()}`.substring(2);
    barChart.selectAll("g").attr("unused", randomId);
    

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
                .attr("width", keyframe.width)
                .attr("y", keyframe.yPos)
                .duration(barChartConfig.transitionDuration);

            const contentMargin = 10;
            const barLabel = barArea.select("text")
            const barIcon = barArea.select("image");
            const barLabelWidth = barLabel.node().getComputedTextLength();
            const labelXInsidePosition = keyframe.width - barChartConfig.iconContainerWidth - barLabelWidth - contentMargin;
            if (labelXInsidePosition >= 0) {
                barLabel
                    .transition()
                    .attr("fill", "black")
                    .attr("x", labelXInsidePosition)
                    .attr("y", keyframe.yPos + barChartConfig.barHeight / 2)
                    .duration(barChartConfig.transitionDuration);

                const iconXInsidePosition = keyframe.width - contentMargin - barChartConfig.iconContainerWidth + (barChartConfig.iconContainerWidth - barChartConfig.iconSize) / 2;
                barIcon
                    .transition()
                    .attr("x", iconXInsidePosition)
                    .attr("y", keyframe.yPos + (barChartConfig.barHeight - barChartConfig.iconSize) / 2)
                    .duration(barChartConfig.transitionDuration);

            } else {
                barLabel
                    .transition()
                    .attr("fill", "white")
                    .attr("x", contentMargin + keyframe.width)
                    .attr("y", keyframe.yPos + barChartConfig.barHeight / 2)
                    .duration(barChartConfig.transitionDuration);

                barIcon
                    .transition()
                    .attr("x", 2 * contentMargin + barLabelWidth + keyframe.width)
                    .attr("y", keyframe.yPos + (barChartConfig.barHeight - barChartConfig.iconSize) / 2)
                    .duration(barChartConfig.transitionDuration);
            }

            barArea.attr("unused", null);

        } else {
            const id = keyframe.label.replace(/[^a-z]+/gi, "");
            const barArea = barChart.append("g")
                .attr("bar-id", id);

            const barRectangle = barArea.append("rect");
            barRectangle
                .attr("width", keyframe.width)
                .attr("height", barChartConfig.barHeight)
                .attr("fill", "url(#barGradient)")
                .attr("x", 0)
                .attr("y", barChartConfig.svgHeight);

            const barLabel = barArea.append("text");
            barLabel
                .attr("opacity", 1)
                .attr("font-size", `${barChartConfig.baseFontSize}px`)
                .attr("text-anchor", "left")
                .attr("dominant-baseline", "middle")
                .attr("y", barChartConfig.svgHeight + barChartConfig.barHeight / 2)
                .text(keyframe.label);

            const barIcon = barArea.append("image");
            barIcon
                .attr("opacity", 1)
                .attr("href", keyframe.iconUrl)
                .attr("height", barChartConfig.iconSize)
                .attr("width", barChartConfig.iconSize)
                .attr("y", barChartConfig.svgHeight + (barChartConfig.barHeight - barChartConfig.iconSize) / 2);

            const contentMargin = 10;
            setTimeout(() => {
                const barLabelWidth = barLabel.node().getComputedTextLength();
                const labelXInsidePosition = keyframe.width - barChartConfig.iconContainerWidth - barLabelWidth - contentMargin;
                if (labelXInsidePosition >= 0) {
                    barLabel
                        .attr("fill", "black")
                        .attr("x", labelXInsidePosition)
                        .transition()
                        .attr("y", keyframe.yPos + barChartConfig.barHeight / 2)
                        .duration(barChartConfig.transitionDuration);

                    const iconXInsidePosition = keyframe.width - contentMargin - barChartConfig.iconContainerWidth + (barChartConfig.iconContainerWidth - barChartConfig.iconSize) / 2;
                    barIcon
                        .attr("x", iconXInsidePosition)
                        .transition()
                        .attr("y", keyframe.yPos + (barChartConfig.barHeight - barChartConfig.iconSize) / 2)
                        .duration(barChartConfig.transitionDuration);

                } else {
                    barLabel
                        .attr("fill", "white")
                        .attr("x", contentMargin + keyframe.width)
                        .transition()
                        .attr("y", keyframe.yPos + barChartConfig.barHeight / 2)
                        .duration(barChartConfig.transitionDuration);

                    barIcon
                        .attr("x", 2 * contentMargin + barLabelWidth + keyframe.width)
                        .transition()
                        .attr("y", keyframe.yPos + (barChartConfig.barHeight - barChartConfig.iconSize) / 2)
                        .duration(barChartConfig.transitionDuration);
                }

                barRectangle
                    .transition()
                    .attr("width", keyframe.width)
                    .attr("y", keyframe.yPos)
                    .duration(barChartConfig.transitionDuration);
            }, 250);

            barArea.attr("unused", null);
        }
    });

    const unusedBarAreaList = barChart.selectAll(`g[unused='${randomId}']`);

    const rect = unusedBarAreaList.select("rect");

    rect
        .transition()
        .attr("y", barChartConfig.svgHeight)
        .duration(barChartConfig.transitionDuration);

    unusedBarAreaList.select("text")
        .transition()
        .attr("y", barChartConfig.svgHeight + barChartConfig.barHeight / 2)
        .duration(barChartConfig.transitionDuration);

    unusedBarAreaList.select("image")
        .transition()
        .attr("y", barChartConfig.svgHeight + (barChartConfig.barHeight - barChartConfig.iconSize) / 2)
        .duration(barChartConfig.transitionDuration);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            barChart.selectAll(`g[unused='${randomId}']`).remove();
            resolve();
        }, barChartConfig.transitionDuration)
    });
}
