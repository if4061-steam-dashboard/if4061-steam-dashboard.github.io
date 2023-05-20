function calculateKeyframes(state) {
    const result = [];
    const filteredStateData = state.data.filter(d => d.playerBaseMonthAverage != "");
    if (filteredStateData.length > 0) {
        const maxPlayerBaseMonthAverage = Math.max(filteredStateData[0].playerBaseMonthAverage, 1);
        filteredStateData.forEach((d, index) => {
            const width = barChartConfig.maxWidth * d.playerBaseMonthAverage / maxPlayerBaseMonthAverage;
            const yPos = index * (barChartConfig.verticalSpace + barChartConfig.barHeight);

            let labelValue = "";
            let value = Math.round(d.playerBaseMonthAverage);
            while (value >= 1000) {
                let hundredDigits = String(value % 1000);
                while (hundredDigits.length < 3) {
                    hundredDigits = "0".concat(hundredDigits);
                }
                hundredDigits = ".".concat(hundredDigits);
                labelValue = hundredDigits.concat(labelValue);

                value = Math.floor(value / 1000);
            }
            /* value < 1000 */
            labelValue = String(value).concat(labelValue);

            result.push({
                label: d.name,
                iconUrl: d.iconUrl,
                yPos,
                width,
                labelValue
            });
        });
    }

    return result;
}
