function makeLineChart(context) {
    const { genre, year } = context;

    // Delete previous line chart
    lineChart.selectAll("*").remove();

    // Set overall size
    const x = d3.scaleTime()
        .range([0, lineWidth - lineMargin.left - lineMargin.right]);

    const y = d3.scaleLinear()
        .range([lineHeight - lineMargin.top - lineMargin.bottom, 20]);

    // Title
    let title = "Playerbase Steam " + year;
    if (genre != "")    // If all genre selected, change if needed
    {
        title = "Playerbase Steam genre " + genre + " " + year;
    }
    lineChart
        .append("text")
        .attr("class", "title")
        .attr("x", (lineWidth - lineMargin.left - lineMargin.right) / 2)
        .attr("y", 0 - lineMargin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", lineFontSize * 2)
        .style("fill", "#e0e0e0")
        .text(title);

    getLineChartData(context).then(displayedData => {
        // Line chart scaling
        x.domain(d3.extent(displayedData, d => d.date));
        y.domain([0, d3.max(displayedData, d => d.value)]);
        
        // The X axis
        lineChart.append("g")
            .attr("transform", `translate(0, ${lineHeight - lineMargin.top - lineMargin.bottom})`)
            .style("font-size", lineFontSize)
            .call(d3.axisBottom(x)
                .ticks(d3.timeMonth.every(1))
                .tickFormat(d3.timeFormat("%b %Y"))
                .tickSize(0)
                .tickPadding(10)
                )
            .call(g => g.select(".domain").remove()) 
            .selectAll(".tick text")
            .style("fill", "#e0e0e0");

        // The Y axis
        lineChart.append("g")
            .style("font-size", lineFontSize + 4)
            .call(d3.axisLeft(y)
                .ticks(10)
                .tickFormat(d => {
                    return `${(d / 1000000).toFixed(1)} Jt`;
                })
                .tickSize(0)
                .tickPadding(10)
                )
            .call(g => g.select(".domain").remove()) 
            .selectAll(".tick text")
            .style("fill", "#e0e0e0") 
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
            .attr("stroke-width", .2);

        // // Add horizontal gridlines
        lineChart.selectAll("yGrid")
            .data(y.ticks(10).slice(1))
            .join("line")
            .attr("x1", 0)
            .attr("x2", lineWidth)
            .attr("y1", d => y(d))
            .attr("y2", d => y(d))
            .attr("stroke", "#e0e0e0")
            .attr("stroke-width", .4)

        // Add Y-axis label
        lineChart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - lineMargin.left)
            .attr("x", 0 - ((lineHeight - lineMargin.top - lineMargin.bottom) / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", lineFontSize)
            .style("fill", "#e0e0e0")
            .style("font-family", "sans-serif")
            .text("Jumlah Pemain");

        // Add X-axis label
        lineChart.append("text")
            .attr("x", (lineWidth - lineMargin.left - lineMargin.right) / 2)
            .attr("y", 0 + lineHeight - lineMargin.bottom)
            .attr("text-anchor", "middle")
            .style("font-size", lineFontSize)
            .style("fill", "#e0e0e0")
            .text("Waktu");

        // Draw the line
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value));

        var path = lineChart.append("path")
            .datum(displayedData)
            .attr("d", line)
            .attr("stroke", "#137EB0")
            .attr("stroke-width", 2)
            .attr("fill", "none");


        // // For animating, but sh*t doesn't work smh
        // var totalLength = path.node().getTotalLength();

        // path
        //     .attr("stroke-dasharray", totalLength + " " + totalLength)
        //     .attr("stroke-dashoffset", totalLength)
        //     .transition()
        //     .duration(2000)
        //         .ease("linear")
        //         .attr("stroke-dashoffset", 0);

        // Add a circle element
        const circle = lineChart.append("circle")
            .attr("r", 0)
            .attr("fill", "#137EB0")
            // .style("stroke", "white")
            .attr("opacity", .70)
            .style("pointer-events", "none");

        // create a listening rectangle
        const listeningRect = lineChart.append("rect")
            .attr("width", lineWidth)
            .attr("height", lineHeight);

        // create the mouse move function
        listeningRect.on("mousemove", function (event) {
            const [xCoord] = d3.pointer(event, this);
            const bisectDate = d3.bisector(d => d.date).left;
            const x0 = x.invert(xCoord);
            const i = bisectDate(displayedData, x0, 1);
            const d0 = displayedData[i - 1];
            const d1 = displayedData[i];
            const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            const xPos = x(d.date);
            const yPos = y(d.value);

            // Update the circle position
            circle.attr("cx", xPos)
                .attr("cy", yPos);

            // Add transition for the circle radius
            circle.transition()
                .duration(50)
                .attr("r", 5);

            // add in  our tooltip
            tooltip
                .style("display", "block")
                .style("left", `${Math.max(420, Math.min(780, xPos))}px`)
                .style("top", `${lineHeight + lineMargin.top}px`)
                .html(`<strong>Waktu:</strong> ${d.date.toLocaleDateString("id-ID",{month: "long", year: "numeric"})}<br><strong>Jumlah Pemain:</strong> ${d.value !== undefined ? (d.value / 1000000).toFixed(1) + ' Jt' : 'N/A'}`)
            });

        // listening rectangle mouse leave function
        listeningRect.on("mouseleave", function () {
            circle.transition()
                .duration(50)
                .attr("r", 0);

            tooltip.style("display", "none");
        });

    });
}
