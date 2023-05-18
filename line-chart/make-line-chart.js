function makeLineChart(context) {
    const { genre, year } = context;

    // Replace with anim
    lineChart.selectAll("*").remove();

    // Set overall size
    const x = d3.scaleTime()
        .range([0, lineWidth - lineMargin.left - lineMargin.right]);

    const y = d3.scaleLinear()
        .range([lineHeight - lineMargin.top - lineMargin.bottom, 20]);

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
                .ticks((d3.max(displayedData, d => d.value)) / 500000)
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
            .data(y.ticks((d3.max(displayedData, d => d.value)) / 1000000).slice(1))
            .join("line")
            .attr("x1", 0)
            .attr("x2", lineWidth)
            .attr("y1", d => y(d))
            .attr("y2", d => y(d))
            .attr("stroke", "#e0e0e0")
            .attr("stroke-width", .4)

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

        // Draw the line
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value));

        lineChart.append("path")
            .datum(displayedData)
            .attr("fill", "none")
            .attr("stroke", "#137EB0")
            .attr("stroke-width", 2)
            .attr("d", line);

    });
}
