// brute force baby :v
// Udh ada sejak sblm presentasi, males ganti metode
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