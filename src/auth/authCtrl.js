'use strict';

module.exports = function($scope, $state, $auth, $mdToast) {
  'ngInject';

  $scope.credentials = {};
  $scope.registration = {};

  $scope.signUp = function() {
    $auth.submitRegistration($scope.registration)
    .then(function(resp) {
      $state.go('registered');    
    })
    .catch(function(resp) {
      var emailTaken = resp.data.errors.email;
      var fullResponse = resp.data.errors.full_messages;
      console.log(emailTaken);
      console.log(fullResponse);
      if (emailTaken) {
        $mdToast.show(
          $mdToast.simple()
          .textContent(fullResponse[0])
          .hideDelay(3000)    
        );
      }
    });
  };

  $scope.login = function() {
    
    $auth.submitLogin($scope.credentials)
    .then(function(resp) { 
      $state.go('session.active.bodymass');    
    })
    .catch(function(resp) { 
    }); 
  };

  $scope.signOut = function() {
    $auth.signOut()
      .then(function(resp) {
        $state.go('login'); 
      })
      .catch(function(resp) {
         
      });
  };

  $scope.register = function() {
    $scope.activeLogin = false;
    $scope.registering = true;
  };
};
