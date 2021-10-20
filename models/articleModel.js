const mongoose = require('mongoose');

const articleModel = new mongoose.Schema({
    name: String,
    content: String,
    publisheAt: Date
});

module.exports = mongoose.model('Article', articleModel)