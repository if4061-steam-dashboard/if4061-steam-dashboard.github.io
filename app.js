const svgWidth = config.barChart.svgWidth;
const svgHeight = config.barChart.svgHeight;
const graph = d3.select("body")
   .append("svg").attr("width", svgWidth).attr("height", svgHeight);

function makeBarChart(genre, startTimeAttribute, endTimeAttribute) {
    if (genre != null) {
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

        const newMaxPlayerBase = Math.max(playerBase, maxPlayerBase);
        if (newMaxPlayerBase != maxPlayerBase) {
            bars.forEach(bar => {
                bar.select("rect")
                    .attr("width", playerBase * bar.attr("playerBase") / newMaxPlayerBase);
            });
            maxPlayerBase = newMaxPlayerBase;
        }

        console.log(genre);
        console.log(playerBase);
        console.log(maxPlayerBase);

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

makeBarChart(null, "November 2021", "November 2022");
