const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    lastLogin: Date,
    status: String
})

module.exports = model('User', userSchema)