function getBarChartData (genre, year, month) {
    let path = "";
    switch (genre) {
        case "Action":
            path = actionDatasetPath;
            break;
        case "Adventure":
            path = adventureDatasetPath;
            break;
        case "Casual":
            path = casualDatasetPath;
            break;
        case "Education":
            path = educationDatasetPath;
            break;
        case "Racing":
            path = racingDatasetPath;
            break;
        case "RPG":
            path = rpgDatasetPath;
            break;
        case "Simulation":
            path = simulationDatasetPath;
            break;
        case "Sports":
            path = sportsDatasetPath;
            break;
        case "Strategy":
            path = strategyDatasetPath;
            break;
    }
    if (path == ""){
        return("Error. No genre inputted.");
    }
    //year input assumed to be be "2021", "2022" etc
    //month input assumed to be "February, January, March" just like in the csv

    let data = []
    d3.csv(path, function(d) {
        let  data0 = {
            "name": d["Name"],
            "playerBaseMonthAverage": d[month.concat(" ", year)],
            "iconUrl": ""//idk how to get one, sorry :(
        }
        data.push(data0);
    });

    let monthContext = "";
        switch (month) {
            case "January":
                monthContext = "JAN";
                break;
            case "February":
                monthContext = "FEB";
                break;
            case "March":
                monthContext = "MAR";
                break;
            case "April":
                monthContext = "APR";
                break;
            case "May":
                monthContext = "MAY";
                break;
            case "June":
                monthContext = "JUN";
                break;
            case "July":
                monthContext = "JUL";
                break;
            case "August":
                monthContext = "AUG";
                break;
            case "September":
                monthContext = "SEP";
                break;
            case "October":
                monthContext = "OCT";
                break;
            case "November":
                monthContext = "NOV";
                break;
            case "December":
                monthContext = "DEC";
                break;
        }

    const state = {
        "context" : {
            "genre": genre,
            "year": year,
            "month": monthContext
        },
        "data" : data
    };
    return state;
}