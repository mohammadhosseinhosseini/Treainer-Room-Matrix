export default function handler(req, res) {
    if (req.method === 'GET') {
        getCourses(req, res)
    } else if (req.method === 'PUT') {
        updateCourse(req, res)
    } else if (req.method === 'POST') {
        // addCourse(req, res)
    }
}

// @route   GET api/courses
// @desc    Get all courses
// @access  Public

// const courses = require('../../../data/courses.json')

const { db } = require('../../../firebase/db-admin')

const getCourses = async (req, res) => {
    // const coursesRef = db.collection('courses')
    // const snapshot = await coursesRef.get()
    // if (snapshot.empty) {
    //     res.status(404).json({ message: 'No matching documents.' })
    // }

    const courses = snapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            firebase_id: doc.id,
        }
    })
    res.send({ message: 'success', courses })
}

// @route   PUT api/courses
// @desc    Update course
// @access  Public

const updateCourse = async (req, res) => {
    const coursesRef = db.collection('courses')
    const snapshot = await coursesRef.get()
    if (snapshot.empty) {
        res.status(404).json({ message: 'No matching documents.' })
    }

    const courses = snapshot.docs.map(async (doc) => {
        const courseRef = db.collection('courses').doc(doc.id)
        await courseRef.set({
            training_reference_number: 'RT0-41',
        })
    })

    res.send({ message: 'success' })
}

const coursesData = [
    {
        id: 11,
        name: 'Block Course',
        firebase_id: '2cahqSYpHhJl1N1G0GNJ',
    },
    {
        id: 9,
        name: 'Anwendungssoftware BODAS-ASrun Automatic Fan Control-DE-S (eTraining)',
        firebase_id: '35C6z1GM9sKaSPxV3raZ',
    },
    {
        id: 1,
        name: '"Experience" mobile hydraulics-EN-S',
        firebase_id: '62N09iN2h59Ak7XgQTmt',
    },
    {
        id: 10,
        name: 'ATP-i4.0cpt - Industrie 4.0 Praxis kompakt - Technisches Add-On für i4.0-Einsteiger',
        firebase_id: 'ASbTgGeWITU3pqmxMCjw',
    },
    {
        id: 4,
        name: 'ActiveCockpit Basis-DE-A',
        firebase_id: 'FTHwXZpqGqb9a8YnCQlQ',
    },
    {
        name: 'Anwendungssoftware BODAS-ASrun Automatic Fan Control-DE-S',
        id: 8,
        firebase_id: 'HgyLe4hpTVYCyy8SfpuW',
    },
    {
        id: 2,
        name: 'Accumulators in systems-EN-B',
        firebase_id: 'R5BStsLyz0YCWTROak5I',
    },
    {
        name: 'ActiveMover Projektierung-DE-A',
        id: 6,
        firebase_id: 'XQUFX9kPeUwrQpVrGBJK',
    },
    {
        id: 7,
        name: 'Advanced knowledge of the PLC technology (2nd generation)-EN-A',
        firebase_id: 'auaaqsyuVmxz0TXvBCLe',
    },
    {
        id: 5,
        name: 'ActiveMover Basis-DE-A',
        firebase_id: 'bq9sF3lRXzlrXJ5S4YTi',
    },
    {
        name: 'ActiveCockpit Applikation und Service-DE-A',
        id: 3,
        firebase_id: 'pAtxC4w3TpraWNR75ny6',
    },
]
// const addCourse = async (req, res) => {
//     const coursesRef = db.collection('courses')
//     const snapshot = await coursesRef.get()
//     if (snapshot.empty) {
//         res.status(404).json({ message: 'No matching documents.' })
//     }

//     for (let i = 0; i < coursesData.length; i++) {
//         await db
//             .collection('courses')
//             .doc()
//             .set({ ...coursesData[i], training_reference_number: 'RT0-41' })
//     }

//     res.send({ message: 'success' })
// }
