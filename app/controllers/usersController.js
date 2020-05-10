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
            res.send(pick(user, ['_id', 'username', 'email']))
        })
        .catch(err => res.send(err))
}

module.exports.login = (req, res) => {
    const body = req.body
    // console.log('in the login')
    User.findByCredentials(body.email, body.password)
        .then(user => {
            // res.send(user)
            return user.generateToken()
        })
        .then(function (token) {
            res.send({ token })
        })
        .catch(err => {
            res.status('401').send('invalid email or password')
        })
}

module.exports.account = (req, res) => {
    const { user } = req
    user.token = req.token
    res.send(pick(user, '_id', 'username', 'email'))
}