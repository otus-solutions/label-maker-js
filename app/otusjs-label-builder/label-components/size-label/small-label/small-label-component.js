(function() {
    'use strict';

    angular
      .module('otusjs.labelMaker.labelBuilder.labelComponents')
      .component('smallLabel', {
          transclude: true,
          templateUrl: 'app/otusjs-label-builder/label-components/size-label/small-label/small-label-template.html',
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
        'BARCODE_SMALL_SETTINGS'
      ];

      function Controller($scope, $element, $compile, BARCODE_SETTINGS) {
        var self = this;

        self.renderBarcode = renderBarcode;
        self.baseInfo = angular.copy(self.base);

        self.$onInit = function() {
          $compile($element.contents())($scope);
          console.info("here")
          renderBarcode();
        };

        function renderBarcode() {
          const barcodeContainer = $element.find(`svg`);
          for(var i = 0; i < barcodeContainer.length; i++) {
            if(barcodeContainer[i].id == "participant" &&
               self.componentLabel == 'participant') {
              JsBarcode(barcodeContainer[i], self.baseInfo.recruitment_number, BARCODE_SETTINGS);
            }

            if(barcodeContainer[i].id == "biomaterial" &&
               self.componentLabel == 'biomaterial') {
              JsBarcode(barcodeContainer[i], self.biomaterial.code, BARCODE_SETTINGS);
            }

            if(barcodeContainer[i].id == "unattached" &&
               self.componentLabel == 'unattached') {
              JsBarcode(barcodeContainer[i], self.baseInfo.laboratoryIdentification, BARCODE_SETTINGS)
            }
          }
        }
      }
}());
