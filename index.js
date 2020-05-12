const express = require('express')
const app = express()
const setUpDB = require('./config/database')
// const port = 3010
const port = process.env.PORT || 3000
const path = require('path')
const router = require('./config/routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/', router)

setUpDB()

app.use(express.static(path.join(__dirname, "client/build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

app.listen(port, () => {
    console.log('listening on the port', port)
})