function makeEnterTransition(state) {
    const keyframes = calculateKeyframes(state);
    keyframes.forEach(keyframe => {
        const id = keyframe.label.replace(/[^a-z0-9]+/gi, "");
        const barArea = barChart.append("g")
            .attr("class", "bar-area")
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


        /* <g id="bar-chart-tooltip" transform="scale(0.95, 0.95) translate(2, 82)">
  <text opacity="1" fill="white" dominant-baseline="bottom" x="1200" text-anchor="end" y="-10" font-size="20px">629.325</text>
  <line x1="1200" y1="0" x2="1200" y2="50" stroke="white" stroke-dasharray="5 5"></line>
</g> */

        const barHint = barArea.append("g")
            .attr("class", "bar-hint");
        const barHintLine = barHint.append("line");
        barHintLine
            .attr("x1", keyframe.width)
            .attr("y1", -50)
            .attr("x2", keyframe.width)
            .attr("y2", keyframe.yPos)
            .attr("stroke", "#83FF8F")
            .attr("stroke-dasharray", "5 5")
            .attr("stroke-width", "1.25")
            .attr("opacity", 0)
            .attr("class", "bar-hint-line");

        const barHintLabel = barHint.append("text");
        barHintLabel
            .attr("fill", "white")
            .attr("dominant-baseline", "bottom")
            .attr("text-anchor", "end")
            .attr("x", keyframe.width)
            .attr("y", -60)
            .attr("font-size", "20px")
            .attr("opacity", 0)
            .attr("class", "bar-hint-label")
            .text(keyframe.labelValue);

        const showHint = function () {
            barHintLabel
                .transition()
                .attr("opacity", 1)
                .duration(200);
            barHintLine
                .transition()
                .attr("opacity", 1)
                .duration(200);
        };
        const hideHint = function () {
            barHintLabel
                .transition()
                .attr("opacity", 0)
                .duration(200);
            barHintLine
                .transition()
                .attr("opacity", 0)
                .duration(200);
        };
        barArea.on("mouseenter", showHint);
        barArea.on("mouseleave", hideHint);
        if (state.context.genre == "") {
            barArea.attr("cursor", "pointer");
            barArea.on("click", function () {
                genreDropdownElement.value = keyframe.label;
                makeChartsFromDropdownCurrentValues();
            });
        }

        if (keyframe.width - barHintLabel.node().getComputedTextLength() < 0) {
            barHintLabel.attr("text-anchor", "start");
        }

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
