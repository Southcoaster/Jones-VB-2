'use strict';

angular.module('jonesVintageBooks')
.service('dataService', function($http) {
  this.helloWorld = function() {
    console.log("This is the data service's method!!");
  };

  this.createProduct = function(formData){
    $http.post('/api/products', formData)
  }
  
  this.getProducts = function(callback){
    $http.get('/api/products')
    .then(callback)
  };
  
  this.deleteProduct = function(productId) {
    $http.delete('/products/' + productId)
            .error(function(data) {
                console.log('Error: ' + data);
            });
    console.log(productId + " product has been deleted!")
    // other logic
  };
  
  this.saveProduct = function(product) {
    console.log('Trying to update product: '+ product._id);
    $http.put('/api/products/', product)
      .error(function(data){
        console.log('Error: '+ data)
      });
  };

  this.searchNumbers = function(number){
    $http.post('/api/isbn/' + number)
    .success(function(data){
      console.log("success: " + data)
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
  };
  
});