(function() {
    'use strict';

    angular
      .module('otusjs.labelMaker.labelBuilder.labelComponents')
      .component('baseLabel', {
          transclude: true,
          templateUrl: 'app/otusjs-label-builder/label-components/base-label/base-label-template.html',
          controller: Controller,
          bindings: {
            labelComponent: '=',
            base: '=',
            tube: '=',
            aliquot: '=',
            labInfo: '='
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

        self.renderBarcode = renderBarcode;
        self.BaseInfo = angular.copy(self.base);

        self.$onInit = function() {
          $compile($element.contents())($scope);
          renderBarcode();
        };

        function renderBarcode() {
          var barcodeContainer = $element.find('svg')[0];
          if(self.labelComponent == "biomaterial"){
            JsBarcode(barcodeContainer, self.tube.code, BARCODE_SETTINGS);
          }
        }
      }
}());
