const mongoose = require('mongoose')

const setUpDB = () => {
    // mongoose.connect('mongodb://localhost:27017/url-shortner-task', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    //     .then(res => console.log('connected to the DB'))
    //     .catch(err => console.log(err))

    mongoose.connect('mongodb+srv://yashjais:Pengu123@cluster0-mxqsz.mongodb.net/URL?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(res => {
            console.log('connected to db')
        })
        .catch(err => {
            alert(err)
        })
}

module.exports = setUpDB