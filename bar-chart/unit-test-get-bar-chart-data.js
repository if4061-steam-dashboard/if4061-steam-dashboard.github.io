let unsuccessfulTests = 2;
Promise.all([
    // Normal execution
    getBarChartData({ genre: "Action", month: "DES", year: "2022" })
        .then(result => { console.log(result); unsuccessfulTests -= 1; })
        .catch(() => console.error("Unexpected error on normal execution.")),
    // Invalid genre
    getBarChartData({ genre: "Invalid Genre", month: "DES", year: "2022" })
        .then(() => console.error("Expected error because of invalid genre."))
        .catch(e => { console.log(e); unsuccessfulTests -= 1; })
]).then(() => {
    if (unsuccessfulTests != 0) {
        throw "Bar chart data test cases error!!!";
    }
});
