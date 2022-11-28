const isDateEqual = (date1, date2) => {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    )
}

const isWeekWqual = (date1, date2) => {
    return (
        getWeekNumber(date1) === getWeekNumber(date2) &&
        date1.getFullYear() === date2.getFullYear()
    )
}

const getWeekNumber = (d) => {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    // Calculate full weeks to nearest Thursday
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
}

module.exports = {
    isDateEqual,
    getWeekNumber,
    isWeekWqual,
}
