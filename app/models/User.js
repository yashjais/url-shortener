const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
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
    mobile: {
        type: String,
        unique: true,
        minlength: 10,
        maxlength: 10
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
    ],
    loginInfo: {
        count: {
            type: String,
            default: 1
        },
        ipAddress: {
            type: String
        }
    }
})

userSchema.pre('save', function (next) {
    const user = this
    // console.log('user is in pre save')
    if (user.isNew) {
        // console.log('in if of pre')
        bcrypt.genSalt(10)
            .then(salt => {
                return bcrypt.hash(user.password, salt)
            })
            .then(encPass => {
                user.password = encPass
                next()
            })
            .catch(err => {
                Promise.reject('gen salt is not found')
            })
    } else {
        // console.log('in else of pre')
        next()
    }
})

userSchema.statics.findByToken = function (token) {
    const User = this
    let tokenData
    try {
        tokenData = jwt.verify(token, 'jwt@123')
    }
    catch (err) {
        return Promise.reject(err)
    }
    // console.log(tokenData)
    return User.findOne({
        _id: tokenData._id,
        'tokens.token': token
    })
}

userSchema.methods.generateToken = function () {
    const user = this
    user.loginInfo.count = Number(user.loginInfo.count) + 1
    // console.log('code is in static method')
    // console.log(user)
    const tokenData = {
        _id: user._id,
        name: user.name,
        createdAt: Number(new Date())
    }
    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({ token })
    return user.save()
        .then(user => {
            return Promise.resolve(token)
        })
        .catch(err => {
            return Promise.reject(err)
        })

}


userSchema.statics.findByCredentials = function (email, password) {
    const User = this
    return User.findOne({ email })
        .then(function (user) {
            if (!user) {
                return Promise.reject('invalid email/password')
            }
            return bcrypt.compare(password, user.password)
                .then(function (result) {
                    if (result) {
                        return Promise.resolve(user)
                    } else {
                        return Promise.reject('invalid email/password')
                    }
                })
                .catch(function (err) {
                    return Promise.reject(err)
                })
        })
        .catch(function (err) {
            return Promise.reject(err)
        })
}


const User = mongoose.model('User', userSchema)

module.exports = User