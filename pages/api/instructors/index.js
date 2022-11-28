export default async function handler(req, res) {
    if (req.method === 'GET') {
        await getInstructors(req, res)
    }
}

// @route   GET api/instructors
// @desc    Get all instructors
// @access  Public

const { db } = require('../../../firebase/db-admin')

const getInstructors = async (req, res) => {
    const instructorsRef = db.collection('instructors')
    const snapshot = await instructorsRef.get()
    if (snapshot.empty) {
        res.status(404).json({ message: 'No matching documents.' })
    }

    const instructors = snapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            firebase_id: doc.id,
        }
    })
    res.send({ message: 'success', instructors })
}
