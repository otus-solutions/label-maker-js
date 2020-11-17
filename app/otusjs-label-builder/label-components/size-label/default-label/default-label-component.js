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

      function Controller($scope, $element, $compile, BARCODE_SETTINGS) {
        var self = this;

        self.renderBarcode = renderBarcode;
        self.baseInfo = angular.copy(self.base);
        self.identified = self.baseInfo.printStructure.identified.value;
        self.type = self.baseInfo.printStructure.type.value

        self.$onInit = function() {
          $compile($element.contents())($scope);
          if(self.biomaterial && self.biomaterial.hasOwnProperty('aliquotCode')){
            self.biomaterial.code = self.biomaterial.aliquotCode
          }
          if(self.type == 'qrcode') {
            renderQrcode();
          }else if(self.type == 'barcode') {
            renderBarcode();
          }
        };

        function renderBarcode() {
          if(self.componentLabel == 'participant') {
            var barcodeContainer = $element.find('#participantbarcode')[0];
            JsBarcode(barcodeContainer, self.baseInfo.recruitment_number, BARCODE_SETTINGS);
          }else if(self.componentLabel == 'biomaterial') {
            var barcodeContainer = $element.find('#biomaterialbarcode')[0];
            JsBarcode(barcodeContainer, self.biomaterial.code, BARCODE_SETTINGS)
          }else if(self.componentLabel == 'unattached') {
            var barcodeContainer = $element.find('#unattachedbarcode')[0];
            JsBarcode(barcodeContainer, self.baseInfo.laboratoryIdentification, BARCODE_SETTINGS)
          }
        }

        function renderQrcode() {
          var typeNumber = 2;
          var errorCorrectionLevel = 'L';
          var qr = qrcode(typeNumber, errorCorrectionLevel);

          if(self.componentLabel == 'participant'){
            addQrIntoElement(qr, "#participantqr", self.baseInfo.recruitment_number.toString())
          }else if(self.componentLabel == 'biomaterial') {
            addQrIntoElement(qr, "#biomaterialqr", self.biomaterial.code)
          }else if(self.componentLabel == 'unattached') {
            addQrIntoElement(qr, '#unattachedqr', self.baseInfo.laboratoryIdentification)
          }
        }

        function addQrIntoElement(qr, elementId, datastring){
          var qrcodeContainer = $element.find(elementId)[0]
          qr.addData(datastring);
          qr.make();
          qrcodeContainer.innerHTML = qr.createImgTag()
        }
      }
}());
