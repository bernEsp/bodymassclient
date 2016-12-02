'use strict';
var process = require('process');

module.exports = function($scope, $state,$http ,currentUser) {
  'ngInject';

  var domain = process.env.DOMAIN;

  $scope.data = {};
  $scope.category = '';

  var req = {
     method: 'POST',
     url: domain+'/body_mass_index.json',
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
