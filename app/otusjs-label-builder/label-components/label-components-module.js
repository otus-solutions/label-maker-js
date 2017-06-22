(function() {
  'use strict';

  angular
    .module('otusjs.labelMaker.labelBuilder.labelComponents', [])
    .constant(
      'BARCODE_SETTINGS', {
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
    );
}());
