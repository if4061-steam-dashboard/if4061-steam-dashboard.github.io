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
            .attr("y", keyframe.yPos)
            .transition()
            .attr("width", keyframe.width)
            .duration(barChartConfig.transitionDuration);

        const barLabel = barArea.append("text");
        barLabel
            .attr("x", keyframe.labelXPos - keyframe.width)
            .attr("y", keyframe.yPos + barChartConfig.barHeight / 2)
            .attr("opacity", 0)
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
            .attr("x", keyframe.labelXPos)
            .attr("opacity", 1)
            .duration(barChartConfig.transitionDuration);

        barArea.append("image")
            .attr("href", keyframe.iconUrl)
            .attr("height", barChartConfig.iconSize)
            .attr("width", barChartConfig.iconSize)
            .attr("opacity", 0)
            .attr("x", keyframe.iconXPos + (barChartConfig.iconContainerWidth - barChartConfig.iconSize) / 2 - keyframe.width)
            .attr("y", keyframe.yPos + (barChartConfig.barHeight - barChartConfig.iconSize) / 2)
            .transition()
            .attr("opacity", 1)
            .attr("x", keyframe.iconXPos + (barChartConfig.iconContainerWidth - barChartConfig.iconSize) / 2)
            .duration(barChartConfig.transitionDuration);

        /* <image href="mdn_logo_only_color.png" height="200" width="200" /> */
    });

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, barChartConfig.transitionDuration)
    });
}
