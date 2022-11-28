export default async function handler(req, res) {
    if (req.method === 'GET') {
        await getRooms(req, res)
    }
}

// @route   GET api/rooms
// @desc    Get all rooms
// @access  Public

const { db } = require('../../../firebase/db-admin')

const getRooms = async (req, res) => {
    const roomsRef = db.collection('rooms')
    const snapshot = await roomsRef.get()
    if (snapshot.empty) {
        res.status(404).json({ message: 'No matching documents.' })
    }

    const rooms = snapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            firebase_id: doc.id,
        }
    })
    res.send({ message: 'success', rooms })
}
