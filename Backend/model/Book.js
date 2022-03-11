const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bookSchema = new Schema ({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
    },
    ratings: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model("Book",bookSchema)