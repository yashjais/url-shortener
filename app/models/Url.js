const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
    longUrl: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    shortenedUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Url = mongoose.model('Url', urlSchema)

module.exports = Url