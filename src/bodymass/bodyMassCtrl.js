'use strict';
var process = require('process');

module.exports = function($scope, $state,$http ,currentUser) {
  'ngInject';


  $scope.data = {};
  $scope.category = '';

  var req = {
     method: 'POST',
     url: ' https://mybodymassindex.herokuapp.com/body_mass_index.json',
     headers: {
          'Content-Type': 'application/json'
        },
     data: $scope.data
  }


  $scope.calculate = function() {
    $http(req)
    .then(function(response) {
      $scope.category = response.data.category;
    })
    .catch(function(response) {
      console.log(response);
    });
  }


};
