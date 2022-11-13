export default function handler(req, res) {
    if (req.method === 'GET') {
        getCourses(req, res)
    }
}

// @route   GET api/courses
// @desc    Get all courses
// @access  Public

const courses = require('../../../data/courses.json')

const getCourses = (req, res) => {
    res.status(200).json(courses)
}
