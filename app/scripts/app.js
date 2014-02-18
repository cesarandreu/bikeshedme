'use strict';

angular.module('bikeshedmeApp', [
  'ajoslin.promise-tracker',
  'angularFileUpload',
  'jmdobry.angular-cache',
  'ngCookies',
  'ui.router'
])
.constant('_', _)
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      views: {
        layout: {
          templateUrl: 'partials/navbar',
          controller: 'NavbarCtrl'
        },
        content: {
          templateUrl: 'partials/main',
          controller: 'MainCtrl'
        }
      }
    });

});
