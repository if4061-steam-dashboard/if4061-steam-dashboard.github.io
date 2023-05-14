function calculateKeyframes(state) {
    const result = [];
    state.data.forEach((d, index) => {
        const width = barChartConfig.maxWidth * d.playerBaseMonthAverage / state.data[0].playerBaseMonthAverage;
        const barEndXPos = width;
        let iconXPos = barEndXPos - barChartConfig.iconContainerWidth;
        let labelXPos = iconXPos - barChartConfig.labelContainerWidth;
        let labelColor = "black";

        if (labelXPos - barChartConfig.labelLeftMargin < 0) {
            labelXPos = barEndXPos + barChartConfig.labelLeftMargin;
            iconXPos = labelXPos + barChartConfig.labelContainerWidth;
            labelColor = "white";
        }

        const yPos = index * (barChartConfig.verticalSpace + barChartConfig.barHeight);

        result.push({
            label: d.name,
            iconUrl: d.iconUrl,
            yPos,
            width,
            labelXPos,
            iconXPos,
            labelColor
        });
    });

    return result;
}
