export default function handler(req, res) {
    if (req.method === 'GET') {
        getRooms(req, res)
    }
}

// @route   GET api/rooms
// @desc    Get all rooms
// @access  Public

const rooms = require('../../../data/rooms.json')

const getRooms = (req, res) => {
    res.status(200).json(rooms)
}
