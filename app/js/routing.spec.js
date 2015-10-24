'use strict';
describe('example.routing', function () {
  var $state, $q, $templateCache, $location, $rootScope, $injector, mockSomeRepository, mockOtherRepository, mockModal;

  function mockTemplate(templateRoute, tmpl) {
    $templateCache.put(templateRoute, tmpl || templateRoute);
  }

  function goFrom(url) {
    return {
      toState: function (state, params) {
        $location.replace().url(url); //Don't actually trigger a reload
        $state.go(state, params);
        $rootScope.$digest();
      }
    };
  }

  beforeEach(module('example.routing', function ($provide) {
    $provide.value('someRepository', mockSomeRepository = {getModel: jasmine.createSpy('getModel')});
    $provide.value('otherRepository', mockOtherRepository = {getModel: jasmine.createSpy('getModel')});
    $provide.value('modal', mockModal = {open: jasmine.createSpy('modalOpen')});
  }));
  beforeEach(inject(function (_$state_, _$q_, _$templateCache_, _$location_, _$rootScope_, _$injector_) {
    $state = _$state_;
    $q = _$q_;
    $templateCache = _$templateCache_;
    $location = _$location_;
    $rootScope = _$rootScope_;
    $injector = _$injector_;
  }));

  describe('path', function () {
    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    describe('when empty', function () {
      beforeEach(function () {
        mockTemplate('views/home.html');
      });

      it('should go to the home state', function () {
        goTo('');
        expect($state.current.name).toEqual('home');
      });
    });

    describe('/', function () {
      beforeEach(function () {
        mockTemplate('views/home.html');
      });

      it('should go to the home state', function () {
        goTo('/');
        expect($state.current.name).toEqual('home');
      });
    });

    describe('/home', function () {
      beforeEach(function () {
        mockTemplate('views/home.html');
      });

      it('should go to the home state', function () {
        goTo('/home');
        expect($state.current.name).toEqual('home');
      });
    });

    describe('otherwise', function () {
      beforeEach(function () {
        mockTemplate('views/404.html');
      });

      it('should go to the 404 state', function () {
        goTo('someNonExistentUrl');
        expect($state.current.name).toEqual('404');
      });

      it('should not change the url', function () {
        var badUrl = '/someNonExistentUrl';
        goTo(badUrl);
        expect($location.url()).toEqual(badUrl);
      });
    });
  });

  describe('state', function () {
    function resolve(value) {
      return {
        forStateAndView: function (state, view) {
          var viewDefinition = view ? $state.get(state).views[view] : $state.get(state);
          return $injector.invoke(viewDefinition.resolve[value]);
        }
      };
    }

    beforeEach(function () {
      mockTemplate('views/home.html'); // state transition occurs, mock the basic template
    });

    describe('stateWithoutViews', function () {
      it('should resolve someModel', function () {
        var onResolved = jasmine.createSpy('resolve'); // just a spy of any sort
        mockSomeRepository.getModel = function () { // just a mock for the service
          return $q.when('something');
        };

        resolve('someModel').forStateAndView('stateWithoutViews').then(onResolved);
        $rootScope.$digest();
        expect(onResolved).toHaveBeenCalledWith('something');
      });
    });

    describe('stateWithViews', function () {
      it('should resolve otherModel', function () {
        var onResolved = jasmine.createSpy('resolve'); // just a spy of any sort
        mockOtherRepository.getModel = function () { // just a mock for the service
          return $q.when('other');
        };

        resolve('otherModel').forStateAndView('stateWithViews', 'main@layout').then(onResolved);
        $rootScope.$digest();
        expect(onResolved).toHaveBeenCalledWith('other');
      });
    });
  });

  describe('onEnter', function () {
    it('should open a modal', function () {
      goFrom('/modalState').toState('modal');
      expect(mockModal.open).toHaveBeenCalled();
    });
  });

  describe('onExit', function () {
    it('should close the modal', function () {
      mockTemplate('views/home.html');
      var modal = {close: jasmine.createSpy('modalClose')};
      mockModal.open = function () {
        return modal;
      };
      goFrom('/modalState').toState('modal');
      goFrom('/home').toState('home');
      expect(modal.close).toHaveBeenCalled();
    });
  });
});