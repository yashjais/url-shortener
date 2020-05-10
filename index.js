const express = require('express')
const app = express()
const setUpDB = require('./config/database')
const port = 3010
const router = require('./config/routes')

app.use('/', router)


setUpDB()

app.listen(port, () => {
    console.log('listening on the port', port)
})