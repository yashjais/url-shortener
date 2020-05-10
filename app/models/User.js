const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 4
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    tokens: [{
        token: {
            type: String
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User