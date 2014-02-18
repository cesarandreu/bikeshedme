'use strict';

describe('Directive: validationError', function () {

  // load the directive's module
  beforeEach(module('bikeshedmeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<validation-error></validation-error>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the validationError directive');
  }));
});
