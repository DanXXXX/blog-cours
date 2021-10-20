const Article = require('../models/articleModel');
const Category = require('../models/categoryModel');

exports.list = (req, res) => {
    Article.find()
  .then((articles) => {
    res.render('index',{title: "Express", "articles": articles})
   // res.status(200).json(articles);
    console.log('reussie');
  }).catch((error) => {
    res.status(200).json(error);
    console.error('error');
  });
}

exports.show = (req, res) => {
  //console.log(req.param.id);
  Article.findOne({_id: req.params.id})
  .then((article) => {
    res.render('single-article', {article: article});
   // console.log(article);
  }).catch((error) => {
    res.redirect('/');
    //console.error(error);
  });
} 

exports.add = (req, res) => {
         Category.find()
         .then((categories) => {
         res.render('add-article', {categories: categories});
           
         }).catch((err) => {
           res.redirect('/');
         });
}