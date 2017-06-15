var app = angular.module('app', ['ngRoute', 'ngResource']);
 
app.factory('Stickers', ['$resource', function($resource) {
    return $resource('/stickers/:id', null, {
        'update': {method: 'PUT'}
    });
  }]);