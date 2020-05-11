const express = require('express')
const router = express.Router()
const authenticateUser = require('../app/middlewares/authenticateUser')

const usersController = require('../app/controllers/usersController')
const urlsController = require('../app/controllers/urlsController')

// router.get('/', (req, res) => {
//     res.send('hhelloo')
// })

// users functionality

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account', authenticateUser, usersController.account)
router.delete('/users/logout', authenticateUser, usersController.logout)

// url functionality

router.post('/url-shortner', authenticateUser, urlsController.shortner)

module.exports = router 