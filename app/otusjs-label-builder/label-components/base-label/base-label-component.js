(function() {
    'use strict';

    angular
      .module('otusjs.labelMaker.labelBuilder.labelComponents')
      .component('baseLabel', {
          transclude: true,
          templateUrl: 'app/otusjs-label-builder/label-components/base-label/base-label-template.html',
          controller: Controller,
          bindings: {
            base: '<',
            biomaterialList: '<',
            labInfo: '='
          }
      });

      Controller.$inject = [
        '$scope',
        '$element',
        '$compile',
      ];

      function Controller($scope, $element, $compile) {
        var self = this;

        self.BaseInfo = angular.copy(self.base);

        self.$onInit = function() {
          $compile($element.contents())($scope);
        };

      }
}());
