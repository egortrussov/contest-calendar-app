const formatDate = (data) => {
    // let date = new Date(date1);
    let monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    // let day = date.getDate();
    // let monthIndex = date.getMonth();
    // let year = date.getFullYear();

    let { day, month, year } = data;

    if (day == null) 
        return monthNames[month - 1] + ', ' + year;

    return day + ' ' + monthNames[month - 1] + ', ' + year;
};

export {
    formatDate
}