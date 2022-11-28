export default async function handler(req, res) {
    if (req.method === 'GET') {
        await getOrganizations(req, res)
    }
}

// @route   GET api/organizations
// @desc    Get all organizations
// @access  Public

const { db } = require('../../../firebase/db-admin')

const getOrganizations = async (req, res) => {
    const organizationsRef = db.collection('organizations')
    const snapshot = await organizationsRef.get()
    if (snapshot.empty) {
        res.status(404).json({ message: 'No matching documents.' })
    }

    const organizations = snapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            firebase_id: doc.id,
        }
    })
    res.send({ message: 'success', organizations })
}
