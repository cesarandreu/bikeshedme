'use strict';

angular.module('bikeshedmeApp')
  .service('Bikeshed', function Bikeshed(ModelFetcher, $angularCacheFactory) {

    var index = new ModelFetcher({
      url: function (params) {
        params = params || {};
        if (!params.page) {
          params.page = 0;
        }
        return '/api/bikeshed/?page=' + params.page;
      },
      link: function (params) {
        params = params || {};
        if (!params.page) {
          params.page = 0;
        }
        return '/browse/' + params.page;
      },
      validate: function (params) {
        params = params || {};
        params.page = parseInt(params.page, 10);
        return params.page > 0;
      },
      modelToParameters: function (model) {
        return {
          page: model.page
        };
      },
      cache: $angularCacheFactory('BikeshedIndex', {
        capacity: 5,
        storageMode: 'localStorage'
      })
    });

    var create = {
      getUrl: function () {
        return '/api/bikeshed/';
      }
    };



    return {
      create: create,
      index: index
    };

  });
