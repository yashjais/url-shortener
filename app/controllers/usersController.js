const User = require('../models/User')
const pick = require('lodash/pick')

module.exports.register = (req, res) => {
    // console.log('in register')
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => {
            // res.send(user)
            // console.log(user)
            res.send(pick(user, ['_id', 'name', 'email']))
        })
        .catch(err => res.send(err))
}

module.exports.login = (req, res) => {
    const body = req.body
    // console.log('in the login')
    User.findByCredentials(body.email, body.password)
        .then(user => {
            // res.send(user)
            // console.log('in the login controller', user.loginInfo.count)
            if (Number(user.loginInfo.count) < 100) {
                user.generateToken()
                    .then(function (token) {
                        res.send({ token })
                    })
                    .catch(err => res.send(err))
            } else {
                res.send({ err: 'you have reached max login count' })
                // res.status('401').send('you have reached max login count')
            }
        })
        .catch(err => {
            res.send({ err: 'invalid email or password' })
        })
}

module.exports.account = (req, res) => {
    const { user } = req
    user.token = req.token
    res.send(pick(user, '_id', 'name', 'email', 'mobile'))
}

module.exports.logout = (req, res) => {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(() => res.send('successfully logged out'))
        .catch(err => res.send(err))
}