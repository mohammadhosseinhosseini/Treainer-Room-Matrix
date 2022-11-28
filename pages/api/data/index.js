const { db } = require('../../../firebase/db-admin')

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Get booked dates
        try {
            const instructors = await getInstructors()
            const rooms = await getRooms()
            const bookedDates = await getBookedDates(instructors, rooms)
            const organizations = await getOrganizations()
            const courses = await getCourses()

            // if (bookedDates.length == 0) {
            //     res.status(404).json({ message: 'No matching documents.' })
            //     return
            // }
            res.send({
                message: 'success',
                bookedDates,
                organizations,
                rooms,
                courses,
                instructors,
            })
            return
        } catch (error) {
            res.status(500).json({ message: error.message })
            return
        }
    } else if (req.method === 'POST') {
    }
}

const getBookedDates = async (instructors, rooms) => {
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
            course:
                courses.find((course) => course.id === bookedDate.course_id) ||
                courses[0],
            instructors: bookedDate.instructors.map((i) => {
                return {
                    ...(instructors.find((instructor) => instructor.id === i) ||
                        instructors[0]),
                }
            }),
            room:
                rooms.find((room) => room.id === bookedDate.room_id) ||
                rooms[0],
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

const getOrganizations = async () => {
    const organizationsRef = db.collection('organizations')
    const snapshot = await organizationsRef.get()

    return snapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            firebase_id: doc.id,
        }
    })
}

const getRooms = async () => {
    const roomsRef = db.collection('rooms')
    const snapshot = await roomsRef.get()

    return snapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            firebase_id: doc.id,
        }
    })
}

const getInstructors = async () => {
    const instructorsRef = db.collection('instructors')
    const snapshot = await instructorsRef.get()

    return snapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            firebase_id: doc.id,
        }
    })
}
