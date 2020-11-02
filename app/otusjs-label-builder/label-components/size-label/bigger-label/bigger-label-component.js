(function() {
    'use strict';

    angular
      .module('otusjs.labelMaker.labelBuilder.labelComponents')
      .component('biggerLabel', {
          transclude: true,
          templateUrl: 'app/otusjs-label-builder/label-components/size-label/bigger-label/bigger-label-template.html',
          controller: Controller,
          bindings: {
            componentLabel: "<",
            base: '<',
            biomaterial: '<'
          }
      });

      Controller.$inject = [
        '$scope',
        '$element',
        '$compile',
        'BARCODE_BIGGER_SETTINGS'
      ];

      function Controller($scope, $element, $compile, BARCODE_SETTINGS) {
        var self = this;

        self.renderBarcode = renderBarcode;
        self.baseInfo = angular.copy(self.base);
        self.identified = self.baseInfo.printStructure.identified.value;

        self.$onInit = function() {
          $compile($element.contents())($scope);
          console.info("here")
          renderBarcode();
        };

        function renderBarcode() {
          const barcodeContainer = $element.find(`svg`);
          if(self.componentLabel == 'participant') {
            JsBarcode(barcodeContainer[0], self.baseInfo.recruitment_number, BARCODE_SETTINGS);
          }else if(self.componentLabel == 'biomaterial') {
            // JsBarcode(barcodeContainer[1], self.biomaterial.code, BARCODE_SETTINGS)
          }else if(self.componentLabel == 'unattached') {
            JsBarcode(barcodeContainer[2], self.biomaterial.code, BARCODE_SETTINGS)
          }
        }
      }
}());
