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
    makeLineChart({ genre: genre, year: year });
}

function getValueFromDropdownElement(element) {
    const selectedIndex = element.selectedIndex;
    const selectedOption = element.options[selectedIndex];
    const value = selectedOption.value;
    return value;
}

makeChartsFromDropdownCurrentValues();

