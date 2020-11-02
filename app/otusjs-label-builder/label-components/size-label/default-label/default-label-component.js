(function() {
    'use strict';

    angular
      .module('otusjs.labelMaker.labelBuilder.labelComponents')
      .component('defaultLabel', {
          transclude: true,
          templateUrl: 'app/otusjs-label-builder/label-components/size-label/default-label/default-label-template.html',
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
        'BARCODE_DEFAULT_SETTINGS'
      ];

      function Controller($scope, $element, $compile, BARCODE_DEFAULT_SETTINGS) {
        var self = this;

        self.renderBarcode = renderBarcode;
        self.baseInfo = angular.copy(self.base);

        self.$onInit = function() {
          $compile($element.contents())($scope);
          renderBarcode();
        };

        function renderBarcode() {
          const barcodeContainer = $element.find(`svg`)[0];
          // for(var i = 0; i < barcodeContainer.length; i++) {
          //   if(barcodeContainer[i].id == "participant" &&
          //      self.componentLabel == 'participant') {
          //     JsBarcode(barcodeContainer[i], self.baseInfo.recruitment_number, BARCODE_DEFAULT_SETTINGS);
          //   }
          JsBarcode(barcodeContainer, self.biomaterial.code, BARCODE_DEFAULT_SETTINGS);
            //
            // if(barcodeContainer[i].id == "unattached" &&
            //    self.componentLabel == 'unattached') {
            //   JsBarcode(barcodeContainer[i], self.baseInfo.laboratoryIdentification, BARCODE_DEFAULT_SETTINGS)
            // }
        }
      }
}());
