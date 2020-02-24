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

      init();

      function init() {
        self.baseInfo = {};
        self.tubesList = [];
        LabelService.pushInfo($scope.$parent.labelData);
        _setInfo();
      }

      function _setInfo() {
        self.tubesList = LabelService.getTubesList();
        self.baseInfo = LabelService.getBaseInfo();
        self.laboratoryInfo = LabelService.getLaboratoryInfo();

        self.loadComponents = true;
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
          '<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.1/angular-material.min.css">' +
          '<link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/otusjs-label-page.min.css"/>' +
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
