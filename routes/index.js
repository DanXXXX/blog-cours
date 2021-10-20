var express = require('express');
const articleController = require('../controllers/article.controllers')
var router = express.Router();

/* GET home page. */
router.get('/', articleController.list);

router.get('/article/:id', articleController.show );

module.exports = router;
