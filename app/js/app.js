(function () {
  'use strict';
  angular.module('example.app', ['example.routing'])
    .service('someRepository', function () {
      this.getModel = function () {
        return ['some item 1', 'some item 2'];
      }
    })
    .service('otherRepository', function () {
      this.getModel = function () {
        return ['other item 1', 'other item 2'];
      }
    });
}());