const barChartScaler = barChartSection.select("#bar-chart-scaler");
const barChartScalerColor = "#83FF8F";
const barChartScalerStrokeWidth = 5;

barChartScaler.append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", scalerConfig.maxWidth)
    .attr("y2", 0)
    .attr("stroke", barChartScalerColor)
    .attr("stroke-width", barChartScalerStrokeWidth);

const maxWidth = scalerConfig.maxWidth;
function getTicks(maxValue) {
    const postfixList = scalerConfig.postfixList;

    let multiplier = 1;
    while (multiplier * 25 <= maxValue) {
        multiplier *= 10;
    }
    /* multiplier * 50 > maxValue */

    if (maxValue < multiplier * 5) {
        // Nothing to do
    } else if (maxValue < multiplier * 10) {
        multiplier *= 2;
    } else {
        multiplier *= 5;
    }

    const result = [];
    let value = 0;
    let postfixIndex = 0;
    while (value <= maxValue) {
        while (Math.pow(10, (postfixIndex + 1) * 3) <= value && postfixIndex < postfixList.length) {
            postfixIndex += 1;
        }
        const baseMostSignificantValue = value * Math.pow(10, -3 * postfixIndex);
        let mostSignificantValue;
        if (value % Math.pow(10, 3 * postfixIndex) == 0) {
            mostSignificantValue = String(Math.round(baseMostSignificantValue));
        } else {
            mostSignificantValue = baseMostSignificantValue.toFixed(1);
        }
        mostSignificantValue = mostSignificantValue.replace(".", ",");
        const label = `${mostSignificantValue}${postfixList[postfixIndex]}`;

        result.push({
            label: label,
            value
        });
        value += multiplier;
    }
    return result;
}

function makeScalerTransition(maxValue) {
    const ticks = getTicks(maxValue);
    const previousMaxValue = barChartScaler.attr("maxValue");
    const randomId = `${Math.random()}`.substring(2);

    barChartScaler.selectAll("g").attr("unused", randomId);
    ticks.forEach(tick => {
        const oldBarChartTick = barChartScaler.select(`g[label='${tick.label}']`);
        let tickLine;
        let tickLabel;
        if (oldBarChartTick.size() == 0) {
            const barChartTick = barChartScaler.append("g")
                .attr("label", tick.label);

            tickLine = barChartTick.append("line");
            tickLine
                .attr("y1", 0)
                .attr("y2", 20)
                .attr("opacity", 0)
                .attr("stroke", barChartScalerColor)
                .attr("stroke-width", barChartScalerStrokeWidth);

            tickLabel = barChartTick.append("text");
            tickLabel
                .attr("y", 12.5)
                .attr("opacity", 0)
                .attr("font-size", `12.5px`)
                .attr("text-anchor", "left")
                .attr("dominant-baseline", "middle")
                .attr("fill", "white")
                .text(tick.label);

            if (previousMaxValue === null) {
                tickLine
                    .attr("x1", 0)
                    .attr("x2", 0);

                tickLabel
                    .attr("x", 10)
                    .text(tick.label);
            } else {
                const intPreviousMaxValue = parseInt(previousMaxValue);
                const xDest = Math.min(tick.value * maxWidth / intPreviousMaxValue, maxWidth);
                tickLine
                    .attr("x1", xDest)
                    .attr("x2", xDest);

                tickLabel
                    .attr("x", xDest + 10)
                    .text(tick.label);

                barChartTick.attr("unused", null);
            }
        } else {
            tickLine = oldBarChartTick.select("line");
            tickLabel = oldBarChartTick.select("text");
            oldBarChartTick.attr("unused", null);
        }

        const xDest = Math.min(tick.value * maxWidth / maxValue, maxWidth);
        tickLine
            .transition()
            .attr("x1", xDest)
            .attr("x2", xDest)
            .attr("opacity", 1)
            .duration(barChartConfig.transitionDuration);

        tickLabel
            .transition()
            .attr("x", xDest + 10)
            .attr("opacity", 1)
            .text(tick.label)
            .duration(barChartConfig.transitionDuration);
    });

    const unusedTicks = barChartScaler.selectAll(`g[unused='${randomId}']`);
    unusedTicks.select("line")
        .datum(function() {
            return Math.min(parseFloat(this.getAttribute("x1")) * previousMaxValue / maxValue, maxWidth);
        })
        .transition()
        .attr("opacity", 0)
        .attr("x1", x => x)
        .attr("x2", x => x)
        .duration(barChartConfig.transitionDuration);

    unusedTicks.select("text")
        .datum(function() {
            return Math.min((parseFloat(this.getAttribute("x")) - 10) * previousMaxValue / maxValue, maxWidth) + 10;
        })
        .transition()
        .attr("opacity", 0)
        .attr("x", x => x)
        .duration(barChartConfig.transitionDuration);

    barChartScaler.attr("maxValue", maxValue);
    return new Promise(resolve => {
        setTimeout(() => {
            barChartScaler.selectAll(`g[unused='${randomId}']`).remove();
            resolve();
        }, barChartConfig.transitionDuration);
    });
}
