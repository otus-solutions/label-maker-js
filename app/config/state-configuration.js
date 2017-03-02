(function() {
  'use strict';

  angular
    .module('otusjs.labelMaker.config')
    .config(stateConfiguration);

  stateConfiguration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function stateConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state('index', {
        url: '/index',
        template: '<setup-component></setup-component>',
        resolve:{}
      });

    $urlRouterProvider.otherwise('/index');
    $locationProvider.html5Mode(true);
  }

}());
