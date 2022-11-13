export default function handler(req, res) {
    if (req.method === 'GET') {
        getOrganizations(req, res)
    }
}

// @route   GET api/organizations
// @desc    Get all organizations
// @access  Public

const organizations = require('../../../data/organizations.json')

const getOrganizations = (req, res) => {
    res.status(200).json(organizations)
}
