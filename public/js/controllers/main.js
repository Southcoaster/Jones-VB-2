'use strict';

angular.module('jonesVintageBooks')
.controller('MainController', function ($scope, dataService, $http) {
    $scope.formData = {};
    $scope.seeMoreVisible = false;
    $scope.isbnVisible = true;
    $scope.manualAdd = false;

    var getProducts = dataService.getProducts;

    getProducts(function(response){
        // console.log(response.data);
        $scope.products = response.data;
    });

    $scope.createProduct = function(formData){
        dataService.createProduct(formData)
        var product = {
            title: formData.title,
            author: formData.author,
            price: formData.price,
            year: formData.year,
            condition: formData.condition,
            firstEdition: formData.firstEdition,
            isSigned: formData.isSigned,
            description: formData.description,
            row: formData.row,
            stack: formData.stack,
            box: formData.box,
            notes: formData.notes,
            updated: false,
            createdDate: new Date()
        }
        $scope.products.push(product)
        $scope.formData = {}
    };

    $scope.deleteProduct = function(productId, $index){
        dataService.deleteProduct(productId);
        $scope.products.splice($index, 1)
    };

    $scope.searchNumbers = function(number){
        dataService.searchNumbers(number);
        var product = {
            title: number,
            isbn: number
        }
        $scope.products.unshift(product);
        $scope.formData = {}
    }

    $scope.saveProduct = function(product){
        dataService.saveProduct(product);
        product.updated = false;
        //$scope.products[product].updated = false;
    }

    // // when landing on the page, get all products and show them
    // $http.get('/api/products')
    //     .success(function(data) {
    //         $scope.products = data;
    //     })
    //     .error(function(data) {
    //         console.log('An Error: ' + data);
    //     });

    // // when submitting the add form, send the text to the node API
    // $scope.createProduct = function() {
    //     console.log("createProduct() fired")
    //     console.log(arguments)
    //     $http.post('/api/products', $scope.formData)
    //         .success(function(data) {
    //             $scope.formData = {}; // clear the form so our user is ready to enter another
    //             $scope.products = data;
    //             //console.log(data);
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //         });
    // };

    // // delete a product after checking it
    // $scope.deleteProduct = function(id) {
    //     $http.delete('/products/' + id)
    //         .success(function(data) {
    //             $scope.products = data;
    //             console.log(data);
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //         });
    // };

//     $scope.products = [
//     {
//     "title" : "Somewhere Over the Rainbow",
//     "author" : "J Simmons",
//     "isbn" : 12346234562,
//     "firstEdition": false,
//     "condition" : "good",
//     "price": 10,
//     "notes": ""
//   },
//   {
//     "title" : "A tale of two Cities",
//     "author" : "Chucky Dick",
//     "isbn" : 34564345732,
//     "firstEdition": false,
//     "condition" : "excellent",
//     "price": 2,
//     "notes": ""
//   },
//   {
//     "title" : "You Win, You Lose",
//     "author" : "Mitt Romney",
//     "isbn" : 3456434521111,
//     "firstEdition": false,
//     "condition" : "excellent",
//     "price": .50,
//     "notes": ""
//   },
//   {
//     "title" : "BOINK! And other Classic Onomonopea",
//     "author" : "Herman Schlooberfart",
//     "isbn" : 345643457112,
//     "firstEdition": false,
//     "condition" : "poor",
//     "price": 2,
//     "notes": ""
//   },
//   {
//     "title" : "War and Pieces",
//     "author" : "D Stoyevsky",
//     "isbn" : 34887650032,
//     "firstEdition": false,
//     "condition" : "good",
//     "price": 2,
//     "notes": ""
//   },
//   {
//     "title" : "Fatty Fat Fat, They Called Me",
//     "author" : "Opera Winfery",
//     "isbn" : 12345566732,
//     "firstEdition": false,
//     "condition" : "excellent",
//     "price": 1,
//     "notes": ""
//   },
//   {
//     "title" : "Welcome to the Thunderdome",
//     "author" : "Jimothey Wancster",
//     "isbn" : 12345545678,
//     "firstEdition": false,
//     "condition" : "fair",
//     "price": 1,
//     "notes": ""
//   },
//   {
//     "title" : "A Beautiful Dream",
//     "author" : "Ed Winters",
//     "isbn" : 122222333444,
//     "firstEdition": true,
//     "condition" : "excellent",
//     "price": 50,
//     "notes": ""
//   },
//   {
//     "title" : "Ancient Techniques of Fresco Artwork",
//     "author" : "T. Mullingsworth",
//     "isbn" : 32445566732,
//     "firstEdition": false,
//     "condition" : "poor",
//     "price": 7,
//     "notes": ""
//   }
// ]

});