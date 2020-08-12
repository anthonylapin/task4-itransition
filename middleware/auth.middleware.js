const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({
                message: "No authorization"
            })
        }

        const decoded = jwt.verify(token, "55cbe60327f9ac5ce301eb8c0baa9f39811a4490cddb2e3ca8efd3e42a9ded3a")
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).json({
            message: "No authorization"
        })
    }
}