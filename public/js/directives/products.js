angular.module('jonesVintageBooks')
.directive('products', function() {
  return {
    templateUrl: 'templates/products.html',
    controller: 'mainController',
    replace: true
  }
})