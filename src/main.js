'use strict';

var angular = require('angular');

require('angular-breadcrumb');
require('angular-mocks');
require('angular-q-spread');
require('angular-cookie');

angular.module(
  'app.components',
  [
    require('./bodymass'),
    require('./nav'),
    require('./auth')
  ]
);

angular.module(
  'app',
  [
    'app.components',
    '$q-spread',
    require('angular-animate'),
    require('angular-sanitize'),
    require('angular-ui-router'),
    require('angular-aria'),
    require('angular-material'),
    require('angular-messages'),
    require('ng-token-auth')
  ]
)
.config(function($stateProvider,
                 $urlRouterProvider,
                 $httpProvider,
                 $authProvider,
                 $mdThemingProvider,
                 $urlMatcherFactoryProvider) {
  'ngInject';

  $authProvider.configure({
    apiUrl: 'https://mybodymassindex.herokuapp.com'
  });

  $urlMatcherFactoryProvider.strictMode(false);
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('login', {
    url: '/login',
    template: require('./auth/index.html'),
    controller: 'authCtrl'
  })
  .state('registered', {
    url: '/registered',
    template: require('./auth/registered.html')
  })
  .state('session', {
    abstract: true,
    resolve: {
      currentUser: function($auth, $state) {
        console.log($auth.validateUser());
        return $auth.validateUser()
          .then(function(response) {
            return response.data; 
          })
          .catch(function() {
            $state.go('login'); 
          });
      }
    }
  })
  .state('session.active', {
    abstract: true,
    views: {
      '@': {
        template: '<ui-view />'
      },
      'navBar@': {
        template:  require('./nav/userMenu.html'),
        controller: 'userMenuCtrl'
      }
    }
  })
  .state('session.active.bodymass', {
    url: '',
    controller: 'bodyMassCtrl', 
    template: require('./bodymass/index.html')
  });

  var headers = {
    'Content-Type': 'application/json'
  };

  $httpProvider.defaults.headers.post = headers;
  $httpProvider.defaults.headers.put = headers;
  $httpProvider.defaults.withCredentials = true;


  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange')
    .warnPalette('red');

})
.run(['$rootScope',
      '$state',
  function($rootScope, $state) {
    console.log('running');
    $rootScope.$on('auth:validation-error', function() {
      console.log('error');
      $state.go('login'); 
    });
    $rootScope.$on('auth:session-expired', function() {
      console.log('expired');
      $state.go('login'); 
    });
    $rootScope.$on('auth:validation-success', function() {
      console.log('valid');
      $state.go('session.active.bodymass');
    });
  }
]);
