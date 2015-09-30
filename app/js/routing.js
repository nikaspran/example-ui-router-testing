(function () {
  'use strict';
  angular.module('example.routing', ['ui.router'])
    .config(function ($urlRouterProvider, $stateProvider) {
      $urlRouterProvider
        .when('', '/home')
        .when('/', '/home')
        .otherwise(function ($injector) {
          $injector.get('$state').go('404', {}, {location: false});
        });

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html'
        })
        .state('layout', {
          abstract: true,
          template: '<div ui-view="main"></div>'
        })
        .state('404', {
          templateUrl: 'views/404.html'
        })
        .state('stateWithoutViews', {
          controller: function ($scope, someModel) {
            $scope.model = someModel;
          },
          resolve: {
            someModel: function (someRepository) {
              return someRepository.getModel();
            }
          }
        })
        .state('stateWithViews', {
          parent: 'layout',
          url: '/stateWithViews',
          views: {
            'main@layout': {
              controller: function ($scope, otherModel) {
                $scope.model = otherModel;
              },
              resolve: {
                otherModel: function (otherRepository) {
                  return otherRepository.getModel();
                }
              }
            }
          }
        });
    });
}());