const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return 'format is invalid'
            }
        }
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 128
    },
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

const User = mongoose.model('User', userSchema)

module.exports = User