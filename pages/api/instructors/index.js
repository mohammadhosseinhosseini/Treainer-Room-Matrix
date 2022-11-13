export default function handler(req, res) {
    if (req.method === 'GET') {
        getInstructors(req, res)
    }
}

// @route   GET api/instructors
// @desc    Get all instructors
// @access  Public

const instructors = require('../../../data/instructors.json')

const getInstructors = (req, res) => {
    res.status(200).json(instructors)
}
