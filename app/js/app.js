(function () {
  'use strict';
  angular.module('example.app', ['example.routing'])
    .service('someRepository', function () {
      this.getModel = function () {
        return ['some item 1', 'some item 2'];
      }
    })
    .service('otherRepository', function ($timeout) {
      this.getModel = function () {
        return $timeout(function () {
          return ['other item 1', 'other item 2'];
        }, 1000);
      }
    })
    .service('modal', function () {
      this.open = function () {
        console.log('Modal opening...');
      };
      this.close = function () {
        console.log('Modal closing...');
      };
    })
}());