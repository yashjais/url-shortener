const User = require('../models/User')

module.exports.register = (req, res) => {
    // console.log('in register')
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => {
            res.send(user)
            // res.send(pick(user, ['_id', 'username', 'email'])
        })
        .catch(err => res.send(err))
}