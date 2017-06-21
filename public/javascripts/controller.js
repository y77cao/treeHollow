var app = angular.module('app', ['ngRoute', 'ngResource']);

app.factory('Stickers', ['$resource', function($resource) {
    return $resource('/stickers/:id', null, {
        'update': {method: 'PUT'}
    });
  }]);

app.controller('stickerController', ['$scope', 'Stickers', function($scope, Stickers) {
  //default values
  $scope.mainPage = true;
  $scope.showMore = false;
  $scope.editing = [];
  $scope.deleting = [];
  $scope.writeDetail = false;
  $scope.searchDetail = false;
  $scope.stickers = Stickers.query();
/*
Stickers.create(
   {name: 'ehhhh',
   uniID: 'dogPzIz8',
   stkContent: 'Im glad to hear it!'}, function(err, todo){
     if(err) console.log(err);
     else console.log(todo);
   });*/

  /*[
  {name: 'yc',
   uniID: '23TplPdS',
   stkContent: 'This is a test',
   stkTime:''},
   
   {name: 'lalala',
   uniID: '46Juzcyx',
   stkContent: 'Is it working? Cool, you are done then! Is NOT working? take a look at the full repository.',
   stkTime:''},
   
   {name: 'y77cao',
   uniID: 'dBvJIh-H',
   stkContent: 'I appreciate your bottom-up approach to teaching. Start with the smallest building blocks and then assemble them into something meaningful.',
   stkTime:''},
   
   {name: 'loo',
   uniID: '2WEKaVNO',
   stkContent: 'I think you forgot to include the step of installing mongoose. I had to ',
   stkTime:''},
   
   {name: 'ehhhh',
   uniID: 'dogPzIz8',
   stkContent: 'Im glad to hear it!', 
   stkTime:''},
   
   {name: 'WTF',
   uniID: 'nYrnfYEv',
   stkContent: 'Amazingly short non-sequential url-friendly unique id generator. ShortId creates amazingly short non-sequential url-friendly unique ids.',
   stkTime:''},
   
   {name: 'Alice',
   uniID: 'a4vhAoFG',
   stkContent: 'Short one here',
   stkTime:''},

   {name: 'yc',
   uniID: '23TplPdS',
   stkContent: 'This is a test',
   stkTime:''},
   
   {name: 'lalala',
   uniID: '46Juzcyx',
   stkContent: 'Is it working? Cool, you are done then! Is NOT working? take a look at the full repository.',
   stkTime:''},
   
   {name: 'y77cao',
   uniID: 'dBvJIh-H',
   stkContent: 'I appreciate your bottom-up approach to teaching. Start with the smallest building blocks and then assemble them into something meaningful.',
   stkTime:''},
   
   {name: 'loo',
   uniID: '2WEKaVNO',
   stkContent: 'I think you forgot to include the step of installing mongoose. I had to ',
   stkTime:''},
   
   {name: 'ehhhh',
   uniID: 'dogPzIz8',
   stkContent: 'Im glad to hear it!', 
   stkTime:''},
   
   {name: 'WTF',
   uniID: 'nYrnfYEv',
   stkContent: 'Amazingly short non-sequential url-friendly unique id generator. ShortId creates amazingly short non-sequential url-friendly unique ids.',
   stkTime:''},
   
   {name: 'Alice',
   uniID: 'a4vhAoFG',
   stkContent: 'Short one here',
   stkTime:''},

   {name: 'WTF',
   uniID: 'nYrnfYEv',
   stkContent: 'Amazingly short non-sequential url-friendly unique id generator. ShortId creates amazingly short non-sequential url-friendly unique ids.',
   stkTime:''},
]; */

  $scope.colorSet = ["#9fdbfc", "#fcbfbf", "#fceebf"];
/*
  $scope.randomnizeColor = function() {
    $scope.bgColor = colorSet[Math.floor(Math.random() * $scope.colorSet.length)];
  } */

  $scope.save = function(){
    console.log("Save clicked");
      if(!$scope.newSticker || $scope.newSticker.length < 1) {
        console.log("User input NULL");
        return;
      }
      var stk = new Stickers({name: 'tester', stkContent: 'shit', uniID:'fgsrgegr'});
      console.log(stk);
    stk.$save(function(){
     $scope.stickers.push(stk);
         $scope.newSticker = '';
         console.log('Saved'); // clear textbox
        });  
      }    
    
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