function calculateKeyframes(state) {
    const result = [];
    const filteredStateData = state.data.filter(d => d.playerBaseMonthAverage != "");
    if (filteredStateData.length > 0) {
        const maxPlayerBaseMonthAverage = Math.max(filteredStateData[0].playerBaseMonthAverage, 1);
        filteredStateData.forEach((d, index) => {
            const width = barChartConfig.maxWidth * d.playerBaseMonthAverage / maxPlayerBaseMonthAverage;
            const yPos = index * (barChartConfig.verticalSpace + barChartConfig.barHeight);

            result.push({
                label: d.name,
                iconUrl: d.iconUrl,
                yPos,
                width
            });
        });
    }

    return result;
}
