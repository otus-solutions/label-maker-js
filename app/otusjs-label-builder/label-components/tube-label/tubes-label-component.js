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
    self.BaseInfo = angular.copy(self.base);
    self.tubesRepeat = []

    self.$onInit = function() {
      $compile($element.contents())($scope);
      for(var i = 0; i < self.tube.printStructure.quantity; i++) {
        self.tubesRepeat.push(angular.copy(self.tube))
      }
      renderBarcode();
    };

    function renderBarcode() {
      var barcodeContainer = $element.find('svg')[0];
      JsBarcode(barcodeContainer, self.tube.code, BARCODE_SETTINGS);
    }
  }
}());
