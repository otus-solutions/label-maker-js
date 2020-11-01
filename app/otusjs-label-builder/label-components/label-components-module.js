(function() {
  'use strict';

  angular
    .module('otusjs.labelMaker.labelBuilder.labelComponents', [])
    .constant(
      'BARCODE_DEFAULT_SETTINGS', {
        format: 'CODE39',
        width: 1.1,
        height: 15,
        displayValue: true,
        font: "monospace",
        textAlign: "center",
        fontSize: 10,
        //   backgroundColor: "",
        //   lineColor: "#000"
      }
    ).constant(
      'BARCODE_SMALL_SETTINGS', {
        format: 'CODE39',
        width: 0.3,
        height: 27,
        displayValue: true,
        font: "monospace",
        textAlign: "center",
        fontSize: 0.8,
        //   backgroundColor: "",
        //   lineColor: "#000"
      });
}());
