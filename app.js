const svgWidth = config.barChart.svgWidth;
const svgHeight = config.barChart.svgHeight;
const graph = d3.select("#bar-chart")
   .attr("width", svgWidth).attr("height", svgHeight);

const genreDropdown = d3.select("#genre-dropdown");
config.genres.forEach(genre => {
    genreDropdown.append("option")
        .attr("value", genre)
        .text(genre);
});

const startTimeDropdown = d3.select("#start-time-dropdown");
const endTimeDropdown = d3.select("#end-time-dropdown");
config.timeAttributes.forEach((timeAttribute, index) => {
    const startTimeOption = startTimeDropdown.append("option")
        .attr("value", timeAttribute)
        .text(timeAttribute);
    const endTimeOption = endTimeDropdown.append("option")
        .attr("value", timeAttribute)
        .text(timeAttribute);

    if (index == config.timeAttributes.length - 1) {
        startTimeOption.attr("selected", true);
        endTimeOption.attr("selected", true);
    }
});

function makeBarChart(genre, startTimeAttribute, endTimeAttribute) {
    if (genre != "") {
        throw Error("Not implemented yet.")
    }

    if ((!config.timeAttributes.includes(startTimeAttribute)) || (!config.timeAttributes.includes(endTimeAttribute))) {
        throw Error("Unexpected attribute in startTimeAttribute/endTimeAttribute")
    }

    graph.selectAll("*").remove();

    const defs = graph.append("defs");
    const bwGradient = defs.append("linearGradient")
        .attr("id", "bwGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
    
    bwGradient.append("stop")
        .attr("offset", "0%")
        .attr("style", "stop-color:rgb(0, 0, 0); stop-opacity:1");

    bwGradient.append("stop")
        .attr("offset", "100%")
        .attr("style", "stop-color:rgb(255, 255, 255); stop-opacity:1");

    const barWidth = config.barChart.barWidth;
    const barHeight = config.barChart.barHeight;
    const barSpace = config.barChart.barSpace;
    const barMaxCount = config.barChart.maxCount;

    const genreAttribute = "genre";
    let maxPlayerBase = 0.1;

    const bars = [];
    const aggregated_dataset_path = config.dataset.aggregatedPath;
    d3.csv(aggregated_dataset_path, (d, i) => {
        const genre = d[genreAttribute];

        let playerBase = 0.0;
        let pick = false;
        config.timeAttributes.forEach(timeAttribute => {
            if ((!pick) && timeAttribute == startTimeAttribute) {
                pick = true;
            }

            if (pick) {
                playerBase += parseFloat(d[timeAttribute]);
            }
            
            if (pick && timeAttribute == endTimeAttribute) {
                pick = false;
            }
        });

        if (pick) {
            playerBase = 0.0;
        }

        const newMaxPlayerBase = Math.max(playerBase, maxPlayerBase);
        if (newMaxPlayerBase != maxPlayerBase) {
            bars.forEach(bar => {
                bar.select("rect")
                    .attr("width", playerBase * bar.attr("playerBase") / newMaxPlayerBase);
            });
            maxPlayerBase = newMaxPlayerBase;
        }

        const bar = graph.append("g")
            .attr("playerBase", playerBase);

        bar.append("rect")
            .attr("width", playerBase * barWidth / maxPlayerBase)
            .attr("height", barHeight)
            .attr("fill", "url(#bwGradient)");

        bars.push(bar);

        bars.sort((bar1, bar2) => bar2.attr("playerBase") - bar1.attr("playerBase"));

        if (bars.length == barMaxCount + 1) {
            const bar = bars.pop();
            bar.remove();
        }


        bars
            .forEach((bar, barIndex) => {
                bar.attr("transform", `translate(0, ${barIndex * (barHeight + barSpace)})`);
            });
    });
}

const genreDropdownElement = document.getElementById("genre-dropdown");
const startTimeDropdownElement = document.getElementById("start-time-dropdown");
const endTimeDropdownElement = document.getElementById("end-time-dropdown");

genreDropdown.on("change", () => {
    makeBarChartFromDropdownCurrentValues();
});
startTimeDropdown.on("change", () => {
    makeBarChartFromDropdownCurrentValues();
});
endTimeDropdown.on("change", () => {
    makeBarChartFromDropdownCurrentValues();
});

function makeBarChartFromDropdownCurrentValues() {
    const genre = getValueFromDropdownElement(genreDropdownElement);
    const startTime = getValueFromDropdownElement(startTimeDropdownElement);
    const endTime = getValueFromDropdownElement(endTimeDropdownElement);
    makeBarChart(genre, startTime, endTime);
}

function getValueFromDropdownElement(element) {
    const selectedIndex = element.selectedIndex;
    const selectedOption = element.options[selectedIndex];
    const value = selectedOption.value;
    return value;
}

makeBarChartFromDropdownCurrentValues();

