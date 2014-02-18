'use strict';

angular.module('bikeshedmeApp')
  .directive('validationError', function () {
    return {

      // We show validation errors if it's invalid and pristine
      // We need to make sure we set pristine to true so that when the user
      // changes the value the validation-error it goes away
      template: '<span ng-if="field.$pristine && field.errors.length > 0" class="validation-error"> {{ err }}</span>',
      restrict: 'E',
      replace: true,
      scope: {
        field: '='
      },
      //link: function postLink(scope, element, attrs) {
      link: function postLink(scope) {
        scope.err = '';
        scope.$watch('field.errors', function (errors) {
          if (errors && errors.length > 0) {
            scope.err = scope.field.$name + ' ' + errors.join(', ');
          }
          scope.field.$setPristine();
        }, true);

      }
    };
  });
