var app = angular.module('app', ['ngRoute', 'ngResource']);

app.factory('Stickers', ['$resource', function($resource) {
    return $resource('/stickers/:id', null, {
        'update': {method: 'PUT'}
    });
  }]);

app.controller('parentController', ['$scope', 'Stickers', function($scope, Stickers) {
  $scope.stickers = Stickers.query();
  $scope.save = function(){
      if(!$scope.newSticker || $scope.newSticker.length < 1) return;
      var stk = new Stickers({name: 'tester', stkContent: $scope.newSticker, uniID:'sjfgwauf'});
    stk.$save(function(){
     $scope.stickers.push(stk);
         $scope.newSticker = '';
        });  
      }    
}]);

app.controller('stickerController', ['$scope', 'Stickers', function($scope, Stickers) {
  //default values
  $scope.mainPage = true;
  $scope.showMore = false;
  $scope.editing = [];
  $scope.deleting = [];
  $scope.writeDetail = false;
  $scope.searchDetail = false;
 // $scope.stickers = Stickers.query();

  $scope.colorSet = ["#9fdbfc", "#fcbfbf", "#fceebf"];
/*
  $scope.randomnizeColor = function() {
    $scope.bgColor = colorSet[Math.floor(Math.random() * $scope.colorSet.length)];
  } */
    
  $scope.editDetail = function(index){
      $scope.editing[index] = angular.copy($scope.stickers[index]);
   }

  $scope.deleteDetail = function(index) {
      $scope.deleting[index] = angular.copy($scope.stickers[index]);
  }

  $scope.commit = function(index){
    var stk = $scope.stickers[index];
    Stickers.update({id: stk._id}, stk);
    console.log("Edited");
    $scope.editing[index] = false;
    }
    
  $scope.remove = function(index){
     var stk = $scope.stickers[index];
      Stickers.remove({id: stk._id}, function(){
      $scope.stickers.splice(index, 1);
      $scope.deleting[index] = false;
        });
      }
        
  $scope.cancel = function(index){
    $scope.editing[index] = false;
    $scope.deleting[index] = false;
        }
      }]); 

app.controller('loginController', ['$scope', function($scope) {
$scope.mainLogin = true;
$scope.localLogin = false;

}]);

//for page direction 
 app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: 'stickerController'
    })
    .when('/public', {
        templateUrl: 'public.html',
        controller: 'stickerController'
    })
    .when('/private', {
        templateUrl: 'private.html',
        controller: 'loginController'
    });
      
  }]); 