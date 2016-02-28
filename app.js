var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
// var routes = require('./routes/index');
// var users = require('./routes/users/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//DB setup
mongoose.connect('mongodb://localhost/JonesVintageBooks'); //Enter DB credentials / path here. 
// mongoose.connect('mongodb://admin:bookmaster66@apollo.modulusmongo.net:27017/Emixar4u'); // connect to our database
var db = mongoose.connection; //Connect to db
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  // var product = new Product();
  // product.title = "Test Product";
  // product.save(function(err){
  //    if(err)
  //      res.send(err);

  //    console.log("saving test product: "+product._id)      
  //  })
  // var productList = Product.find();
  // console.log(productList)
  // console.log('--- Modulus Mongodb connected ---')
  console.log('--- Local Mongodb connected ---')
});

//Bring in Product model
var Product = require('./models/product');

var router = express.Router();

app.use('/', router);
// app.use('/users', users);

var port = process.env.PORT || 9000;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



//middleware to use for all requests to the api
router.use(function(req, res, next){
  console.log('Activity...');
  next();
})

router.get('/', function(req, res){
  //res.json({message: 'hooray! welcome to our api!!!!'});
  res.render('layout', {title: 'Home Page'})
});


// router.get('api/products', function(req, res){
//    res.render('index', {title: 'Our Products'})
//    Product
//    .find({})
//    .limit(10)
//    .sort({_id : -1})
//    .exec(function(err, products){
//      res.json({'productMessage': "test product content"});
//    });
// });

// api ---------------------------------------------------------------------
// get all products
router.get('/api/products', function(req, res) {
    console.log("looking for products")
    // use mongoose to get all products in the database
    Product.find(function(err, products) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(products); // return all products in JSON format
    });
});

// create product and send back all products after creation
router.post('/api/products', function(req, res) {

    // create a product, information comes from AJAX request from Angular
    Product
    .create({
            title : req.body.title,
            author : req.body.author,
            isbn : req.body.isbn,
            lccn : req.body.lccn,
            condition : req.body.condition,
            price : req.body.price,
            year : req.body.year,
            firstEdition : req.body.firstEdition,
            signedCopy : req.body.signedCopy
        }, function(err, product) {
            if (err)
                res.send(err);
    })
    // .exec(function(err){
    //   console.log("New product added: ")
    //      // get and return all the products after you create another
    //     Product.find(function(err, products) {
    //         if (err)
    //             res.send(err)
    //         res.json(products);
    //     });
    // });

});
// delete a product
    router.delete('/products/:product_id', function(req, res) {
        Product.remove({
            _id : req.params.product_id
        }, function(err, product) {
            if (err)
                res.send(err);
            console.log('Product '+req.params.product_id+' deleted.')

            // get and return all the products after you create another
        })
        .exec(function(){
          Product.find(function(err, products) {
              if (err)
                  res.send(err)
              res.json(products);
          });
        })
    });

// FIRE IT UP!
app.listen(port);
console.log("Powerlevel is now : "+port+"!!!");

module.exports = app;