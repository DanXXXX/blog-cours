const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const Article = require('./models/articleModel')
const Category = require('./models/categoryModel');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const mongoose = require('mongoose');


// connection a la base de donnée
mongoose.connect('mongodb://localhost:27017/blog-cours', (error) => {
    if (error) {
        console.error(error); // Affiche l'erreur de Mongodb en cas de problème 
        process.exit(1); // Quite l'application
    }
    console.log('mongodb connecter');
});

for (let index = 0; index < 8; index++) {
  article = new Article({
    name: 'le Lorem ipsum',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum quo voluptatum explicabo eaque omnis eligendi. Harum facere assumenda voluptatum modi laboriosam! Delectus provident numquam quod voluptas sapiente eum nostrum vitae? Eveniet consequuntur cumque ab consectetur magnam cum, explicabo quisquam corrupti, repellat rem maiores omnis doloremque ea laboriosam ad assumenda molestias. Architecto, laudantium amet! Non veniam dicta aperiam, minima excepturi ex consectetur iusto soluta quidem atque odit quae alias nemo dolore eveniet, fugiat sunt fuga earum repudiandae voluptatum id ratione recusandae. Numquam, iste optio! Voluptatem culpa in architecto, eum cupiditate at beatae minima aliquid qui dignissimos laudantium quas fugit fugiat corporis.',
    publishedAt: Date.now()

  })
  
  //article.save()
}

for (let index = 0; index < 8; index++) {
  category = new Category({
    title: 'le Lorem ipsum',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum quo voluptatum explicabo eaque omnis eligendi. Harum facere assumenda voluptatum modi laboriosam! Delectus provident numquam quod voluptas sapiente eum nostrum vitae? Eveniet consequuntur cumque ab consectetur magnam cum, explicabo quisquam corrupti, repellat rem maiores omnis doloremque ea laboriosam ad assumenda molestias. Architecto, laudantium amet! Non veniam dicta aperiam, minima excepturi ex consectetur iusto soluta quidem atque odit quae alias nemo dolore eveniet, fugiat sunt fuga earum repudiandae voluptatum id ratione recusandae. Numquam, iste optio! Voluptatem culpa in architecto, eum cupiditate at beatae minima aliquid qui dignissimos laudantium quas fugit fugiat corporis.'
  })
  
  // category.save()
}
  

  // .then((result) => {
  //   console.log('sauvegarde reussie');
  // }).catch((error) => {
  //   console.error("error");
  // });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
