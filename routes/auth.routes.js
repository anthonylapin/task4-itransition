const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/signup
router.post('/signup',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password length has to be at least 1 character.').exists(),
        check('firstName', 'Field must be non-empty').exists(),
        check('lastName', 'Field must be non-empty').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during registration.'
                })
            }
            const { email, password, firstName, lastName } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({
                    message: 'This user already exists.'
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
                status: 'Active'
            })

            await user.save()
            res.status(201).json({
                message: 'User has been created.'
            })
        } catch (e) {
            res.status(500).json({
                message: "Something went wrong. Try again."
            })
        }
    }
)

// /api/auth/signin
router.post('/signin',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                console.log(errors)
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during signing in.'
                })
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                console.log('Invalid credentials')
                return res.status(400).json({
                    message: 'Invalid credentials.'
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                console.log('Invalid credentials')
                return res.status(400).json({
                    message: 'Invalid credentials.'
                })
            }

            if (user.status === 'Blocked') {
                return res.status(403).json({
                    message: 'User is blocked.'
                })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            user.lastLogin = Date.now()
            await user.save()

            res.json({
                token,
                userId: user.id
            })
        } catch (e) {
            res.status(500).json({
                message: "Something went wrong. Try again."
            })
        }
    }
)

router.get('users', async (req, res) => {
    try {
        let users = await User.find({})

        if (!users) {
            return res.status(204).json({
                message: "No users found"
            })
        }

        users = users.map(user => {
            return {
                id: user.id,
                fullName: user.firstName + " " + user.lastName,
                email: user.email,
                created: user.created,
                lastLogin: user.lastLogin ? user.lastLogin : "User haven't logged in yet",
                status: user.status
            }
        })

        res.status(200).json({
            users
        })

    } catch (e) {
        res.status(500).json({
            message: "Something went wrong. Try again."
        })
    }
})

module.exports = router