const getCurrentDate = () => {
    let date = new Date();

    let currentDate = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }

    return currentDate;
}

export {
    getCurrentDate
}