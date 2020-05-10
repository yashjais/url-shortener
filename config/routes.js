const express = require('express')
const router = express.Router()
const authenticateUser = require('../app/middlewares/authenticateUser')
const usersController = require('../app/controllers/usersController')

// router.get('/', (req, res) => {
//     res.send('hhelloo')
// })

// users funcitonality

router.post('users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account', authenticateUser, usersController.account)

// url funcitonality/

module.exports = router