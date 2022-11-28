export default async function handler(req, res) {
    if (req.method === 'GET') {
        const bookedDates = await getBookedDates()
        if (bookedDates.length == 0) {
            res.status(404).json({ message: 'No matching documents.' })
            return
        }
        res.send({ message: 'success', bookedDates })
        return
    } else if (req.method === 'POST') {
        await addBookedDate(req, res)
    }
}

// @route   GET api/booked-dates
// @desc    Get all booked dates
// @access  Public

const { db } = require('../../../firebase/db-admin')

const getBookedDates = async () => {
    const courses = await getCourses()

    const bookedDatesRef = db.collection('bookedDates')
    const snapshot = await bookedDatesRef.get()
    if (snapshot.empty) {
        return []
    }

    const bookedDates = snapshot.docs.map((doc) => {
        const bookedDate = doc.data()
        return {
            ...bookedDate,
            firebase_id: doc.id,
            course: courses.find(
                (course) => course.id === bookedDate.course_id
            ),
        }
    })
    return bookedDates
}

const getCourses = async () => {
    const coursesRef = db.collection('courses')
    const snapshot = await coursesRef.get()
    if (snapshot.empty) {
        return []
    }

    const courses = snapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            firebase_id: doc.id,
        }
    })
    return courses
}

const addBookedDate = async (req, res) => {
    let newBookedDate = {
        litmos_session_name: req.body.litmos_session_name,
        room_id: req.body.room_id,
        instructor_id: req.body.instructor_id,
        time_zone: 'Europe/Berlin',
        min_seats: 1,
        available_seats: req.body.max_seats,
        max_seats: req.body.max_seats,
        session_type: req.body.session_type,
        session_dates: req.body.session_dates,
    }

    const keys = Object.keys(newBookedDate)

    for (let i = 0; i < keys.length; i++) {
        if (newBookedDate[keys[i]] === undefined) {
            res.status(400).json({ message: `Please include ${keys[i]}` })
            return
        }
    }

    const id = db
        .collection('bookedDates')
        .get()
        .then((snapshot) => {
            return snapshot.size
        })

    newBookedDate.id = id

    // const doc = await db.collection('bookedDates').doc().set(newBookedDate)
    res.send({ message: 'success', bookedDate: newBookedDate })
}
