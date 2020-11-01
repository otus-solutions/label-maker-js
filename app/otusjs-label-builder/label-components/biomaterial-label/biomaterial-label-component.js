(function() {
  'use strict';

  angular
    .module('otusjs.labelMaker.labelBuilder.labelComponents')
    .component('biomaterialLabel', {
      transclude: true,
      templateUrl: 'app/otusjs-label-builder/label-components/biomaterial-label/biomaterial-label-template.html',
      controller: Controller,
      bindings: {
        base: '<',
        biomaterialList: '<'
      }
    });

  Controller.$inject = [
    '$scope',
    '$element',
    '$compile'
  ];

  function Controller($scope, $element, $compile) {
    var self = this;

    self.baseInfo = angular.copy(self.base);

    self.$onInit = function() {
      $compile($element.contents())($scope);
    };
  }
}());
