'use strict';

angular.module('bikeshedmeApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Upload',
      'link': '/'
    }, {
      title: 'Browse',
      link: '/browse'
    }];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
