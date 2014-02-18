'use strict';

describe('Service: Bikeshed', function () {

  // load the service's module
  beforeEach(module('bikeshedmeApp'));

  // instantiate service
  var Bikeshed;
  beforeEach(inject(function (_Bikeshed_) {
    Bikeshed = _Bikeshed_;
  }));

  it('should do something', function () {
    expect(!!Bikeshed).toBe(true);
  });

});
