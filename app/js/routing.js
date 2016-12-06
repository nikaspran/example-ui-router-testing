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

      var modalInstance;
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html'
        })
        .state('layout', {
          abstract: true,
          template: '<div ui-view="main"></div>'
        })
        .state('stateWithUrlParams', {
          url: '/users/:someParam',
          template: 'State with a url parameter: {{someParam}}',
          controller: function ($scope, $stateParams) {
            $scope.someParam = $stateParams.someParam
          }
        })
        .state('404', {
          templateUrl: 'views/404.html'
        })
        .state('modal', {
          url: '/modalState',
          template: 'Pretend this is a modal...',
          onEnter: function (modal) {
            modalInstance = modal.open();
          },
          onExit: function () {
            modalInstance.close();
          }
        })
        .state('onEnterWithResolveDependency', {
          url: '/resolveDependency',
          template: 'Resolved onEnter dependency',
          resolve: {
            resolveDep: function ($q) {
              return $q.when({
                performAction: function () {
                  alert('action performed from resolveDep');
                }
              });
            }
          },
          onEnter: function (resolveDep) {
            resolveDep.performAction();
          }
        })
        .state('stateWithoutViews', {
          url: '/stateWithoutViews',
          template: 'State Without Views, model: {{model}}',
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
              template: 'State With Views, model: {{model}}',
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
