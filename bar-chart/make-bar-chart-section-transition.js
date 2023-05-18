let previousState = null;
let currentState = null;
function makeBarChartSectionTransition(context) {
    if (context.genre == "") {
        console.warn("All-genre option is not implemented on makeBarChartSectionTransition yet. Change automatically to action.");
        context.genre = "Action";
    }
    const { genre, year, month } = context;

    if (genre == "Semua Genre") {
        barChartSection.select("#bar-chart-title").text(`Banyak Pemain per Genre • ${month} ${year}`);
    } else {
        barChartSection.select("#bar-chart-title").text(`Banyak Pemain per Game • ${genre} • ${month} ${year}`);
    }

    getBarChartData(context).then(state => {
        currentState = state;
        console.log(currentState);

        makeBarChartTransition(previousState, currentState);
        makeScalerTransition(currentState.data[0].playerBaseMonthAverage);

        previousState = currentState;
    });
}
