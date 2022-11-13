const fs = require('fs')

const bookedDates = JSON.parse(fs.readFileSync('./bookedDates.json', 'utf8'))

Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h)
    return this
}

bookedDates.map((bookedDate) => {
    bookedDate.session_dates.map((sessionDate) => {
        let date = new Date()
        sessionDate.start_date = date
        sessionDate.end_date = date
        sessionDate.start_time = date
        date = new Date().addHours(10)
        sessionDate.end_time = date
    })
})

fs.writeFileSync('./bookedDates.json', JSON.stringify(bookedDates, null, 2))
