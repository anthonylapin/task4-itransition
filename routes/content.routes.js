const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const router = Router()

// api/content/users
router.get('/users', auth, async (req, res) => {
    try {
        let users = await User.find({})
        users = users.map(user => {
            return {
                id: user.id,
                fullName: user.firstName + " " + user.lastName,
                email: user.email,
                created: user.created.toISOString().split('T')[0],
                lastLogin: user.lastLogin ? user.lastLogin.toISOString().split('T')[0]
                    : "User haven't logged in yet",
                status: user.status,
                isChecked: false
            }
        })
        res.json(users)
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong. Try again."
        })
    }
})

// api/content/user
router.put('/users', auth, async (req, res) => {
    try {
        const { ids, status } = req.body
        records = await User.updateMany({ _id: { $in: ids } }, { $set: { status: status } }, { multi: true })

        res.status(200).json({
            message: "Success"
        })
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong. Try again."
        })
    }
})

router.delete('/users/:id', auth, async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.status(200).json({
            message: "Success"
        })
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong. Try again."
        })
    }
})

module.exports = router