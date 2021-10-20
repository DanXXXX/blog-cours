const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({
    tilte: String,
    desciption: String
});

module.exports = mongoose.model('Category', categoryModel)