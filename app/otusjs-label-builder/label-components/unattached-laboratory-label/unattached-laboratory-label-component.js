(function() {
    'use strict';

    angular
      .module('otusjs.labelMaker.labelBuilder.labelComponents')
      .component('unattachedLaboratoryLabel', {
          transclude: true,
          templateUrl: 'app/otusjs-label-builder/label-components/unattached-laboratory-label/unattached-laboratory-label-template.html',
          controller: Controller,
          bindings: {
            base: '<'
          }
      });

      Controller.$inject = [
        '$scope',
        '$element',
        '$compile',
        'BARCODE_SETTINGS'
      ];

      function Controller($scope, $element, $compile, BARCODE_SETTINGS) {
        var self = this;
        self.LaboratoryBaseInfo = angular.copy(self.base);

        self.$onInit = function() {
          $compile($element.contents())($scope);
          renderBarcode();
        };

        function renderBarcode() {
          var barcodeContainer = $element.find('svg')[0];
          JsBarcode(barcodeContainer, self.base.laboratoryIdentification, BARCODE_SETTINGS);
        }
      }
}());
