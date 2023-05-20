let previousState = null;
let currentState = null;
function makeBarChartSectionTransition(context) {
    // if (context.genre == "") {
    //     console.warn("All-genre option is not implemented on makeBarChartSectionTransition yet. Change automatically to action.");
    //     context.genre = "Action";
    // }
    const { genre, year, month } = context;

    const barChartTitle = barChartSection.select("#bar-chart-title");
    const previousTitle = barChartTitle.text();
    let nextTitle = "";
    if (genre == "") {
        nextTitle = `Banyak Pemain per Genre • ${month} ${year}`;
    } else {
        nextTitle = `Banyak Pemain per Game • ${genre} • ${month} ${year}`;
    }

    if (previousTitle == nextTitle) return; // No need to transition, right?
    typingAnimation(barChartTitle, previousTitle, nextTitle);

    

        

    getBarChartData(context).then(state => {
        currentState = state;
        console.log(currentState);

        makeBarChartTransition(previousState, currentState);

        const maxPlayerBaseMonthAverage = Math.max(state.data[0].playerBaseMonthAverage, 5);
        makeScalerTransition(maxPlayerBaseMonthAverage);

        previousState = currentState;
    });

    function typingAnimation(textElement, previousTitle, nextTitle) {
        let currentTitle = String(previousTitle);
    
        const titleTransitions = [currentTitle.concat("_")];
        while (!nextTitle.startsWith(currentTitle)) {
            currentTitle = currentTitle.substring(0, currentTitle.length - 1);
            titleTransitions.push(currentTitle.concat("_"));
        }
    
        /* Extra wait */
        titleTransitions.push(currentTitle.concat("_"));
        titleTransitions.push(currentTitle.concat("_"));
        titleTransitions.push(currentTitle.concat("_"));
    
        while (currentTitle != nextTitle) {
            currentTitle = nextTitle.substring(0, currentTitle.length + 1);
            titleTransitions.push(currentTitle.concat("_"));
        }
    
        textElement
            .transition()
            .duration(50 * titleTransitions.length)
            .ease(d3.easeLinear)
            .textTween(() => t => {
                if (t < 1) {
                    const index = Math.floor(t * titleTransitions.length);
                    return titleTransitions[index];
                } else {
                    return nextTitle;
                }
            });
    }    
}


