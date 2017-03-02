(function() {
  'use strict';

  angular
    .module('otusjs.labelMaker.labelBuilder.labelComponents')
    .component('tubesLabel', {
      transclude: true,
      templateUrl: 'app/otusjs-label-builder/label-components/tube-label/tubes-label-template.html',
      controller: Controller,
      bindings: {
        base: '<',
        tube: '<'
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

    self.$onInit = function() {
      $compile($element.contents())($scope);
      renderBarcode();
    };

    function renderBarcode() {
      var barcodeContainer = $element.find('svg')[0];
      JsBarcode(barcodeContainer, self.tube.code, BARCODE_SETTINGS);
    }
  }
}());
