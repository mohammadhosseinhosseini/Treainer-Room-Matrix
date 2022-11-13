const fs = require('fs')

export default function handler(req, res) {
    if (req.method === 'GET') {
        getBookedDates(req, res)
    } else if (req.method === 'POST') {
        addBookedDate(req, res)
    }
}

// @route   GET api/booked-dates
// @desc    Get all booked dates
// @access  Public

const bookedDates = require('../../../data/bookedDates.json')

const getBookedDates = (req, res) => {
    res.status(200).json(bookedDates)
}

const addBookedDate = (req, res) => {
    const newBookedDate = {
        id: bookedDates.length + 1,
        litmos_session_name: req.body.litmos_session_name,
        room_id: req.body.room_id,
        instructor_id: req.body.instructor_id,
        time_zone: 'Europe/Berlin',
        min_seats: 1,
        available_seats: req.body.max_seats,
        training_reference_number: req.body.training_reference_number,
        max_seats: req.body.max_seats,
        session_type: req.body.session_type,
        session_dates: req.body.session_dates,
    }

    if (!newBookedDate.room_id || !newBookedDate.instructor_id) {
        return res
            .status(400)
            .json({ msg: 'Please include a room and instructor' })
    }

    bookedDates.push(newBookedDate)
    fs.writeFile(
        'data/bookedDates.json',
        JSON.stringify(bookedDates, null, 4),
        (err) => {
            if (err) {
                console.error(err)
                return res.status(500).send(err)
            }
            res.json({ msg: 'Booked date added', newBookedDate })
        }
    )
}
