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
        biomaterial: '<',
        labelSize: '<'
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
      var barcodeContainer = $element.find('div');
      JsBarcode(barcodeContainer, self.biomaterial.code, BARCODE_SETTINGS);
    }
  }
}());
