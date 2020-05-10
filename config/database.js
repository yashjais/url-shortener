const mongoose = require('mongoose')

const setUpDB = () => {
    mongoose.connect('mongodb://localhost:27017/url-shortner-task', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(res => console.log('connected to the DB'))
        .catch(err => console.log(err))
}

module.exports = setUpDB