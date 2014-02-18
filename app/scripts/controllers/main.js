'use strict';

angular.module('bikeshedmeApp')
  .controller('MainCtrl', function ($scope, $upload, Bikeshed) {

    // Default values
    $scope.title = '';
    $scope.limit = 5;
    $scope.pub = true;



    $scope.create = function (bikeshed) {

      bikeshed.title.errors = [];
      bikeshed.limit.errors = [];
      bikeshed.pub.errors = [];
      bikeshed.imageA.errors = [];
      bikeshed.imageB.errors = [];

      // Must be an image
      // if (bikeshed.imageA.file.type.indexOf('image') < 0) {
      //   bikeshed.imageA.errors.push('must be an image');
      // }
      // if (bikeshed.imageB.file.type.indexOf('image') < 0) {
      //   bikeshed.imageB.errors.push('must be an image');
      // }

      // Must be under 2MiB
      // if (bikeshed.imageA.file.size > 2097152) {
      //   bikeshed.imageA.errors.push('should be less than 2MiB in size');
      // }
      // if (bikeshed.imageB.file.size > 2097152) {
      //   bikeshed.imageB.errors.push('should be less than 2MiB in size');
      // }

      if (bikeshed.title.errors.length  ||
          bikeshed.limit.errors.length  ||
          bikeshed.pub.errors.length    ||
          bikeshed.imageA.errors.length ||
          bikeshed.imageB.errors.length) {
        return;
      }


      $upload.upload({
        url: Bikeshed.create.getUrl(),
        data: {
          title: bikeshed.title.$modelValue,
          limit: bikeshed.limit.$modelValue,
          pub: bikeshed.pub.$modelValue
        },
        file: [bikeshed.imageA.file, bikeshed.imageB.file],
        fileFormDataName: ['imageA', 'imageB']
      })
      .progress(function (evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      })
      .success(function (data) {
        console.log(data);
      })
      .error(function (err) {
        console.log(err);
      });


    };

    $scope.onFileSelect = function (files, value) {
      value.file = files[0];
    };

  });
