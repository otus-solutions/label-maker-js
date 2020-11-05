(function() {
  'use strict';

  angular
    .module('otusjs.labelMaker.labelPage')
    .directive('labelPage', directive);

  directive.$inject = [
    '$window',
    '$compile',
    'otusjs.labelMaker.labelBuilder.LabelService'
  ];

  function directive($window, $compile, LabelService) {
    var ddo = {
      restrict: 'EA',
      scope: {},
      transclude: true,
      templateUrl: 'app/otusjs-label-page/label-page-template.html',
      controller: Controller,
      controllerAs: '$ctrl',
    };

    function Controller($element, $scope) {
      var self = this;
      self.printPage = self.printPage;
      self.newbiomaterialList = []

      init();

      function init() {
        self.baseInfo = {};
        self.bioMaterialList = [];
        LabelService.pushInfo($scope.$parent.labelData);
        _setInfo();
      }

      function _setInfo() {
        self.bioMaterialList = LabelService.getBioMaterialList();
        self.bioMaterialList.forEach(biomaterial => {
          fillArray(biomaterial, biomaterial.printStructure.quantity)
        })
        self.baseInfo = LabelService.getBaseInfo();
        self.laboratoryInfo = LabelService.getLaboratoryInfo();
        self.printStructure = self.baseInfo.printStructure;
        _verifyLabelSize();
        self.loadComponents = true;
      }

      function fillArray(value, len) {
        for (var i = 0; i < len; i++) {
          self.newbiomaterialList.push(value);
        }
      }

      function _verifyLabelSize() {
        if(self.printStructure.labelSize.value == 'bigger'){
          _setBiggerLabel();
        }else if(self.printStructure.labelSize.value == 'small') {
          _setSmallLabel();
        }else if(self.printStructure.labelSize.value == 'default') {
          _setDefaultLabel();
        }
      }

      function _setBiggerLabel() {
        self.baseStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/bigger-label.min.css"/>'
        self.printStructure.columns == 1 ? self.printStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/bigger-label-columns-1.min.css"/>' :
          self.printStructure.columns == 2 ? self.printStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/bigger-label-columns-2.min.css"/>' :
            self.printStructure.columns == 3 ? self.printStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/bigger-label-columns-3.min.css"/>' :
              self.printStructure.columns == 4 ? self.printStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/bigger-label-columns-4.min.css"/>' : ""
      }

      function _setSmallLabel() {
        self.baseStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/small-label.min.css"/>'
        self.printStructure.columns == 1 ? self.printStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/small-label-columns-1.min.css"/>' :
          self.printStructure.columns == 2 ? self.printStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/small-label-columns-2.min.css"/>' :
            self.printStructure.columns == 3 ? self.printStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/small-label-columns-3.min.css"/>' :
              self.printStructure.columns == 4 ? self.printStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/small-label-columns-4.min.css"/>' : ""
      }

      function _setDefaultLabel() {
        if(self.printStructure.type.value == 'qrcode'){
          self.baseStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/default-label-qr.min.css"/>'
        }else {
          self.baseStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/default-label.min.css"/>'
        }
        self.printStructure.columns == 1 ? self.printStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/default-label-columns-1.min.css"/>' :
          self.printStructure.columns == 2 ? self.printStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/default-label-columns-2.min.css"/>' :
            self.printStructure.columns == 3 ? self.printStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/default-label-columns-3.min.css"/>' :
              self.printStructure.columns == 4 ? self.printStyle = '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/default-label-columns-4.min.css"/>' : ""
      }

      $scope.$$postDigest(function() {
        _generateWindow();
      });

      function _generateWindow() {
        var newWindow = $window.open('about:blank', '_blank');
        newWindow.document.write('<html>' +
          '<head><title>Etiquetas</title>' +
          '<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic" rel="stylesheet" />' +
          '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />' +
          `<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min.css">` +
          '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/otusjs-label-page.min.css"/>' +
          self.baseStyle +
          self.printStyle +
          '</head>' +
          '<button class="no-print button-print md-button md-fab md-mini" onclick="window.print()" >' +
          '<i class="material-icons white">print</i>'+
          '</button>' +
          '<body></body>' +
          '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js" type="text/javascript"></script></html>');

         angular.element(newWindow.document.body)
          .append($element.contents());
        newWindow.document.close();
      }

    }
    return ddo;
  }
}());
