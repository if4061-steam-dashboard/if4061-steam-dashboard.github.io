function makeDirectTransition(state) {
    const keyframeList = calculateKeyframes(state);
    barChart.selectAll("g").attr("unused", "true");

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

            barArea.select("text")
                .transition()
                .attr("x", keyframe.labelXPos)
                .attr("y", keyframe.yPos + barChartConfig.barHeight / 2)
                .attr("fill", keyframe.labelColor)
                .duration(barChartConfig.transitionDuration);

            barArea.select("image")
                .transition()
                .attr("x", keyframe.iconXPos + (barChartConfig.iconContainerWidth - barChartConfig.iconSize) / 2)
                .attr("y", keyframe.yPos + (barChartConfig.barHeight - barChartConfig.iconSize) / 2)
                .duration(barChartConfig.transitionDuration);

            barArea.attr("unused", null);

        } else {
            const barArea = barChart.append("g")
                .attr("bar-id", id);
            const barRectangle = barArea.append("rect");
            barRectangle
                .attr("width", keyframe.width)
                .attr("height", barChartConfig.barHeight)
                .attr("fill", "url(#barGradient)")
                .attr("x", 0)
                .attr("y", barChartConfig.svgHeight)
                .transition()
                .attr("y", keyframe.yPos)
                .duration(barChartConfig.transitionDuration);

            const barLabel = barArea.append("text");
            barLabel
                .attr("x", keyframe.labelXPos)
                .attr("y", barChartConfig.svgHeight + barChartConfig.barHeight / 2)
                .attr("font-size", `${barChartConfig.baseFontSize}px`)
                .attr("text-anchor", "left")
                .attr("dominant-baseline", "middle")
                .attr("fill", keyframe.labelColor)
                .text(keyframe.label);
    
            let currentFontSizePx = barChartConfig.baseFontSize; 
            while (barLabel.node().getBBox().width > barChartConfig.labelContainerWidth && currentFontSizePx > 1) {
                currentFontSizePx -= 1;
                barLabel.attr("font-size", `${currentFontSizePx}px`);
            }

            barLabel
                .transition()
                .attr("y", keyframe.yPos + barChartConfig.barHeight / 2)
                .duration(barChartConfig.transitionDuration);

            barArea.append("image")
                .attr("href", keyframe.iconUrl)
                .attr("height", barChartConfig.iconSize)
                .attr("width", barChartConfig.iconSize)
                .attr("opacity", 0)
                .attr("x", keyframe.iconXPos + (barChartConfig.iconContainerWidth - barChartConfig.iconSize) / 2)
                .attr("y", barChartConfig.svgHeight + (barChartConfig.barHeight - barChartConfig.iconSize) / 2)
                .transition()
                .attr("y", keyframe.yPos + (barChartConfig.barHeight - barChartConfig.iconSize) / 2)
                .attr("opacity", 1)
                .duration(barChartConfig.transitionDuration);

            barArea.attr("unused", null);
        }
    });

    const unusedBarAreaList = barChart.selectAll("g[unused=true]");

    const rect = unusedBarAreaList.select("rect");

    rect
        .transition()
        .attr("y", barChartConfig.svgHeight)
        .duration(barChartConfig.transitionDuration);

    unusedBarAreaList.select("text")
        .transition()
        .attr("y", barChartConfig.svgHeight + barChartConfig.barHeight / 2)
        .duration(barChartConfig.transitionDuration);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            unusedBarAreaList.remove();
            resolve();
        }, barChartConfig.transitionDuration)
    });
}
