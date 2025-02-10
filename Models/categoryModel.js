const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    id: {
        type: String,
        // required:true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        // required:true
    },
})

const categories = mongoose.model('categories', categorySchema)

module.exports = categories