(function() {
    'use strict';

    angular
      .module('otusjs.labelMaker.labelBuilder.labelComponents')
      .component('participantLabel', {
          transclude: true,
          templateUrl: 'app/otusjs-label-builder/label-components/participant-label/participant-label-template.html',
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

        self.renderBarcode = renderBarcode;
        self.BaseInfo = angular.copy(self.base);

        self.$onInit = function() {
          $compile($element.contents())($scope);
          renderBarcode();
        };

        function renderBarcode() {
          var barcodeContainer = $element.find('svg')[0];
          JsBarcode(barcodeContainer, self.base.recruitment_number, BARCODE_SETTINGS);
        }
      }
}());
