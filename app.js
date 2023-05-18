const lineWidth = config.lineChart.width;
const lineHeight = config.lineChart.height;
const lineMargin = config.margin;

const lineChart = d3.select("#line-chart")
    .attr("viewBox", `0 0 ${lineWidth} ${lineHeight}`)
    .append("g")
        .attr("transform", `translate(${lineMargin.left}, ${lineMargin.top})`);

const genreDropdown = d3.select("#genre-dropdown");
config.genres.forEach(genre => {
    genreDropdown.append("option")
        .attr("value", genre)
        .text(genre);
});

const monthDropdown = d3.select("#month-dropdown");
config.month.data.forEach(monthAttribute => {
    const monthOption = monthDropdown.append("option")
    .attr("value", monthAttribute)
    .text(monthAttribute);
    
    if (monthAttribute == config.month.default) {
        monthOption.attr("selected", true);
    }
});

const yearDropdown = d3.select("#year-dropdown");
config.year.data.forEach(yearAttribute => {
    const yearOption = yearDropdown.append("option")
        .attr("value", yearAttribute)
        .text(yearAttribute);

    if (yearAttribute == config.year.default) {
        yearOption.attr("selected", true);
    }
});

// brute force baby :v
function monthToDate(timeAttribute) {

    var date;
    switch (timeAttribute) {
        case 'January 2019':
            date = new Date("2019-01-01");
            break;
        case 'February 2019':
            date = new Date("2019-02-01");
            break;
        case 'March 2019':
            date = new Date("2019-03-01");
            break;
        case 'April 2019':
            date = new Date("2019-04-01");
            break;
        case 'May 2019':
            date = new Date("2019-05-01");
            break;
        case 'June 2019':
            date = new Date("2019-06-01");
            break;
        case 'July 2019':
            date = new Date("2019-07-01");
            break;
        case 'August 2019':
            date = new Date("2019-08-01");
            break;
        case 'September 2019':
            date = new Date("2019-09-01");
            break;
        case 'October 2019':
            date = new Date("2019-10-01");
            break;
        case 'November 2019':
            date = new Date("2019-11-01");
            break;
        case 'December 2019':
            date = new Date("2019-12-01");
            break;

        case 'January 2020':
            date = new Date("2020-01-01");
            break;
        case 'February 2020':
            date = new Date("2020-02-01");
            break;
        case 'March 2020':
            date = new Date("2020-03-01");
            break;
        case 'April 2020':
            date = new Date("2020-04-01");
            break;
        case 'May 2020':
            date = new Date("2020-05-01");
            break;
        case 'June 2020':
            date = new Date("2020-06-01");
            break;
        case 'July 2020':
            date = new Date("2020-07-01");
            break;
        case 'August 2020':
            date = new Date("2020-08-01");
            break;
        case 'September 2020':
            date = new Date("2020-09-01");
            break;
        case 'October 2020':
            date = new Date("2020-10-01");
            break;
        case 'November 2020':
            date = new Date("2020-11-01");
            break;
        case 'December 2020':
            date = new Date("2020-12-01");
            break;

        case 'January 2021':
            date = new Date("2021-01-01");
            break;
        case 'February 2021':
            date = new Date("2021-02-01");
            break;
        case 'March 2021':
            date = new Date("2021-03-01");
            break;
        case 'April 2021':
            date = new Date("2021-04-01");
            break;
        case 'May 2021':
            date = new Date("2021-05-01");
            break;
        case 'June 2021':
            date = new Date("2021-06-01");
            break;
        case 'July 2021':
            date = new Date("2021-07-01");
            break;
        case 'August 2021':
            date = new Date("2021-08-01");
            break;
        case 'September 2021':
            date = new Date("2021-09-01");
            break;
        case 'October 2021':
            date = new Date("2021-10-01");
            break;
        case 'November 2021':
            date = new Date("2021-11-01");
            break;
        case 'December 2021':
            date = new Date("2021-12-01");
            break;

        case 'January 2022':
            date = new Date("2022-01-01");
            break;
        case 'February 2022':
            date = new Date("2022-02-01");
            break;
        case 'March 2022':
            date = new Date("2022-03-01");
            break;
        case 'April 2022':
            date = new Date("2022-04-01");
            break;
        case 'May 2022':
            date = new Date("2022-05-01");
            break;
        case 'June 2022':
            date = new Date("2022-06-01");
            break;
        case 'July 2022':
            date = new Date("2022-07-01");
            break;
        case 'August 2022':
            date = new Date("2022-08-01");
            break;
        case 'September 2022':
            date = new Date("2022-09-01");
            break;
        case 'October 2022':
            date = new Date("2022-10-01");
            break;
        case 'November 2022':
            date = new Date("2022-11-01");
            break;
        case 'December 2022':
            date = new Date("2022-12-01");
            break;

        default:
            throw Error("Date not valid")
    }

    return date;
}

function makeLineChart(context) {
    const { genre, month, year } = context;

    // TODO: Use month and year. This is just a placeholder to show the graphic.
    // The real attributes that should be passed are genre, month, and year.
    // Their values based on config.js, not CSV.
    const startTimeAttribute = "January 2022";
    const endTimeAttribute = "December 2022"; 

    if ((!config.timeAttributes.includes(startTimeAttribute)) || (!config.timeAttributes.includes(endTimeAttribute))) {
        throw Error("Unexpected attribute in startTimeAttribute/endTimeAttribute")
    }

    lineChart.selectAll("*").remove();

    const x = d3.scaleTime()
        .range([0, lineWidth - lineMargin.left - lineMargin.right]);

    const y = d3.scaleLinear()
        .range([lineHeight - lineMargin.top - lineMargin.bottom, 0]);

    let displayedData = [];
    
    d3.csv(aggregated_dataset_path, (d, i) => {
        
        let allGenre = false;
        if (genre == "") {
            allGenre = true;
        // ganti ke genre relevan
        } else
        if (d.genre != genre) {
            return;
        }

        let pick = false;
        let currentMonth;
        let findIdx;
        
        config.timeAttributes.forEach(timeAttribute => {
            if ((!pick) && timeAttribute == startTimeAttribute) {
                pick = true;
            }

            if (pick) {

                currentMonth = monthToDate(timeAttribute);

                let found = false;

                
                displayedData.every(function (value, i) {
                    
                    if (+value.date == +currentMonth) {
                        found = true;
                        findIdx = i;
                        return false;
                    }
                    return true;
                });

                if (found)
                {
                    let val = displayedData[findIdx].value;
                    displayedData[findIdx] = { date: currentMonth, value: val + parseFloat(d[timeAttribute]) };
                } 
                else {
                    displayedData.push({ date: currentMonth, value: parseFloat(d[timeAttribute]) });
                }
            }
            
            if (pick && timeAttribute == endTimeAttribute) {
                pick = false;
            }
        });

        console.log(!allGenre || (allGenre && d.genre == "Strategy"));

        if (!allGenre || (allGenre && d.genre == "Strategy")) {

            x.domain(d3.extent(displayedData, d => d.date));
            y.domain([0, d3.max(displayedData, d => d.value)]);

            lineChart
                .append("svg")
                    .attr("width", lineWidth).attr("height", lineHeight)
                .append("g")
                    .attr("transform", `translate(${lineMargin.left}, ${lineMargin.top})`);
            
            lineChart.append("g")
                .attr("transform", `translate(0, ${lineHeight - lineMargin.top - lineMargin.bottom})`)
                .style("font-size", "10px")
                .call(d3.axisBottom(x)
                    .ticks(d3.timeMonth.every(1))
                    .tickFormat(d3.timeFormat("%b %Y")))
                .call(g => g.select(".domain").remove()) 
                .selectAll(".tick line") 
                .style("stroke-opacity", 0)

            lineChart.selectAll(".tick text")
                .attr("fill", "#ffffff");

            lineChart.append("g")
                .style("font-size", "12px")
                .call(d3.axisLeft(y)
                    .ticks((d3.max(displayedData, d => d.value)) / 1000000)
                .tickFormat(d => {
                    return `${(d / 1000000).toFixed(0)} Jt`;
                })
                    .tickSize(0)
                    .tickPadding(10))
                .call(g => g.select(".domain").remove()) 
                .selectAll(".tick text")
                .style("fill", "#ffffff") 
                .style("visibility", (d, i, nodes) => {
                    if (i === 0) {
                        return "hidden"; 
                    } else {
                        return "visible"; 
                    }
                });

            // Add vertical gridlines
            lineChart.selectAll("xGrid")
                .data(x.ticks())
                .join("line")
                .attr("x1", d => x(d))
                .attr("x2", d => x(d))
                .attr("y1", 0)
                .attr("y2", lineHeight - lineMargin.top - lineMargin.bottom)
                .attr("stroke", "#e0e0e0")
                .attr("stroke-width", .5);

            // // Add horizontal gridlines
            lineChart.selectAll("yGrid")
                .data(y.ticks((d3.max(displayedData, d => d.value)) / 1000000).slice(1))
                .join("line")
                .attr("x1", 0)
                .attr("x2", lineWidth)
                .attr("y1", d => y(d))
                .attr("y2", d => y(d))
                .attr("stroke", "#e0e0e0")
                .attr("stroke-width", .5)

            // // Add Y-axis label

            // lineChart.append("text")
            //     .attr("transform", "rotate(-90)")
            //     .attr("y", 0 - lineMargin.left)
            //     .attr("x", 0 - ((lineHeight - lineMargin.top - lineMargin.bottom) / 2))
            //     .attr("dy", "1em")
            //     .style("text-anchor", "middle")
            //     .style("font-size", "14px")
            //     .style("fill", "#777")
            //     .style("font-family", "sans-serif")
            //     .text("Jumlah Pemain");

            const line = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.value));

            lineChart.append("path")
                .datum(displayedData)
                .attr("fill", "none")
                .attr("stroke", "#137EB0")
                .attr("stroke-width", 1)
                .attr("d", line);
        }
    });
}

const genreDropdownElement = document.getElementById("genre-dropdown");
const monthDropdownElement = document.getElementById("month-dropdown");
const yearDropdownElement = document.getElementById("year-dropdown");

genreDropdown.on("change", () => {
    makeChartsFromDropdownCurrentValues();
});
monthDropdown.on("change", () => {
    makeChartsFromDropdownCurrentValues();
});
yearDropdown.on("change", () => {
    makeChartsFromDropdownCurrentValues();
});

function makeChartsFromDropdownCurrentValues() {
    const genre = getValueFromDropdownElement(genreDropdownElement);
    const month = getValueFromDropdownElement(monthDropdownElement);
    const year = getValueFromDropdownElement(yearDropdownElement);
    const context = { genre, month, year };
    
    makeBarChartSectionTransition(context);
    makeLineChart(context);
}

function getValueFromDropdownElement(element) {
    const selectedIndex = element.selectedIndex;
    const selectedOption = element.options[selectedIndex];
    const value = selectedOption.value;
    return value;
}

makeChartsFromDropdownCurrentValues();
