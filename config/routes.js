const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/usersController')

// router.get('/', (req, res) => {
//     res.send('hhelloo')
// })

router.post('/register', usersController.register)
router.post('/login', usersController.login)

module.exports = router