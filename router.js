//  ____   ___  _   _ _____ _____ ____       _ ____
// |  _ \ / _ \| | | |_   _| ____|  _ \     | / ___|
// | |_) | | | | | | | | | |  _| | |_) | _  | \___ \
// |  _ <| |_| | |_| | | | | |___|  _ < | |_| |___) |
// |_| \_\\___/ \___/  |_| |_____|_| \_(_)___/|____/
//
// Routes: 
// "/", "/products"				GET 		home page (latest product listings, search)
// "/products"					POST 		Create new product
// "/products/:product_id"		DELETE 		Delete product
// "/products/:product_id"      PUT         Update product

// "/products/:product_id"      GET         Read individual product page    
// "/products/?:query_string"	GET 		Query db / search
// "/users", "/login"			GET 		Login page
// "/users"						POST 		Create new user
// "/user/:user_id"				GET 		Read individual user page	
// "/user/:user_id"				PUT 		Update user
// "/user/:user_id"				DELETE 		Delete user


var express = require('express');
var router = express.Router();

//Bring in Product model
var Product = require('./models/product');

//middleware to use for all requests to the api
router.use(function(req, res, next){
	console.log('Activity...');
	next();
})



    // API ---------------------------------------------------------------------

    // Read products / get all products
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
    router.post('/products', function(req, res) {

        // Create a product, information comes from AJAX request from Angular
        Product
        .create({
                title : req.body.title || "",
                author: req.body.author,
                isbn: req.body.isbn || 0,
                lccn: req.body.lccn || 0,
                dewey: req.body.dewey || 0,
                year: req.body.year || 0,
                firstEdition: req.body.firstEdition || false,
                isSigned: req.body.isSigned || false,
                pageCount: req.body.pageCount || 0,
                description: req.body.description || "",
                text: req.body.text || "",
                condition: req.body.condition || "",
                coverPriceFloat: req.body.coverPriceFloat || 0,
                price: req.body.price || 0,
                forSale: req.body.forSale || true, 
                row: req.body.row ,
                stack: req.body.stack,
                box: req.body.box ,
                notes: req.body.notes ,
                productCreatedDate: new Date(),
                productUpdatedDate: new Date()
            }, function(err, product) {
                if (err)
                    res.send(err);
        })
        .exec(function(err){
             // get and return all the products after you create another
            Product.find(function(err, products) {
                if (err)
                    res.send(err)
                res.json(products);
            });
        });

    });

    // Delete a product
    router.delete('/api/products/:product_id', function(req, res) {
        console.log('deleting!')
        Product.remove({
            _id : req.params.product_id
        }, function(err, product) {
            if (err)
                res.send(err);
            console.log('Product '+req.params.product_id+' deleted.')

            // get and return all the products after you create another
            Product.find(function(err, products) {
                if (err)
                    res.send(err)
                res.json(products);
            });
        });
    });

    // Update a product
   router.put('/api/products/', function(req, res){
        console.log("put request on /api/products/")
        var query = {_id : req.body._id}
        Product.update(
            query, 
            {
                title : req.body.title || "",
                author: req.body.author,
                isbn: req.body.isbn || 0,
                lccn: req.body.lccn || 0,
                dewey: req.body.dewey || 0,
                year: req.body.year || 0,
                firstEdition: req.body.firstEdition || false,
                isSigned: req.body.isSigned || false,
                pageCount: req.body.pageCount || 0,
                description: req.body.description || "",
                text: req.body.text || "",
                condition: req.body.condition || "",
                coverPriceFloat: req.body.coverPriceFloat || 0,
                price: req.body.price || 0,
                forSale: req.body.forSale || true, 
                row: req.body.row ,
                stack: req.body.stack,
                box: req.body.box ,
                notes: req.body.notes ,
                productUpdatedDate: new Date()
            }, 
            function(err, data){

            if(err)
                return err
            else if(!data)
                return new Error("Error happened")

            console.log('product '+query._id+' updated');
            res.status(200).json(data);
        })
    });

    router.post('/api/isbn/', function(req, res){
        console.log('something');
        var isbn = req.params.isbn;
        var options = {
              host: 'isbndb.com',
              path: '/api/v2/json/RBG4RU6D/book/' + isbn
            };
        
        var callback = function(response) {
          var str = '';
          //another chunk of data has been recieved, so append it to `str`
          response.on('data', function (chunk) {
            str += chunk;
          });
          //the whole response has been recieved, so we just print it out here
          response.on('end', function () {
            var bookData = JSON.parse(str);
            if(bookData.error){
                var errorText = "Unable to locate ISBN " + isbn;
                res.send({error: errorText})
            } else {
                //bookData.isbn = isbn;
                //product.coverImage = getCover(isbn);
                res.json(bookData);
            }
          });
        };

        http.request(options, callback).end();
    });

module.exports = router;