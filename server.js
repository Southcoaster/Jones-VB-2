//  ____  _____ ______     _______ ____       _ ____             _ _   _
// / ___|| ____|  _ \ \   / / ____|  _ \     | / ___|  __      _(_) |_| |__
// \___ \|  _| | |_) \ \ / /|  _| | |_) | _  | \___ \  \ \ /\ / / | __| '_ \
//  ___) | |___|  _ < \ V / | |___|  _ < | |_| |___) |  \ V  V /| | |_| | | |
// |____/|_____|_| \_\ \_/  |_____|_| \_(_)___/|____/    \_/\_/ |_|\__|_| |_|

//     _    _   _  ____ _   _ _        _    ____
//    / \  | \ | |/ ___| | | | |      / \  |  _ \
//   / _ \ |  \| | |  _| | | | |     / _ \ | |_) |
//  / ___ \| |\  | |_| | |_| | |___ / ___ \|  _ <
// /_/   \_\_| \_|\____|\___/|_____/_/   \_\_| \_\

//BASE SETUP//
var express  = require('express'); 
var bodyParser = require('body-parser');
var stylus = require('stylus');
var nib = require('nib');
//var morgan = require('morgan');
var app = express();
var fs = require('fs');
var http = require('http');
var mongoose   = require('mongoose');

//app.use(morgan("combined"));

//Paths to jade views, jade engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//Stylus Middleware
app.use(stylus.middleware({	
	src: __dirname + '/stylus',
	dest: __dirname + '/stylesheets',
	compile: function(str, path){	
			console.log('compiling stylus')
			return stylus(str)
				.set('filename', path)
				.use(nib());
		}
}));



var port = process.env.PORT || 9000;

//Static files
app.use(express.static(__dirname + '/public'));

//MongoDB SETUP
//mongoose.connect('mongodb://localhost/JonesVintageBooks'); //Enter DB credentials / path here. 
mongoose.connect('mongodb://admin:bookmaster66@apollo.modulusmongo.net:27017/Emixar4u'); // connect to our database
var db = mongoose.connection; //Connect to db
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	// var product = new Product();
	// product.title = "Test Product";
	// product.save(function(err){
	// 		if(err)
	// 			res.send(err);

	// 		console.log("saving test product: "+product._id)			
	// 	})
	// var productList = Product.find();
	// console.log(productList)
	console.log('--- Modulus Mongodb connected ---')
});

//Bring in Product model
var Product = require('./models/product');

//configure app to use bodyParser(), this will let us get the data from a POST 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Register our routes 
var router = require('./router.js');

//all our routes will be prefixed with /api
app.use('/', router);

// FIRE IT UP!
app.listen(port);
console.log("Powerlevel is now : "+port+"!!!");

//module.exports = app;