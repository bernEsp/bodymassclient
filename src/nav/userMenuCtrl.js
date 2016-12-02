'use strict';

module.exports = function($scope, $state, currentUser, $auth) {
  'ngInject';
  $scope.currentUser = currentUser;

  $scope.signOut = function() {
    $auth.signOut()
      .then(function(resp) {
        $state.go('login'); 
      })
      .catch(function(resp) {
        console.log('error loggin out'); 
      });
  };
}
