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
        LabelService.pushInfo($scope.$parent.json);
        _setInfo();
      }

      function _setInfo() {
        self.tubesList = LabelService.getTubesList();
        self.baseInfo = LabelService.getBaseInfo();

        self.loadComponents = true;
      }

      $scope.$$postDigest(function() {
        _generateWindow();
      });

      function _generateWindow() {
        var newWindow = $window.open('', '_blank'); //TODO pop-under
        newWindow.document.write('<html><head><title>Etiquetas</title><base href="/otus/" /><link rel="stylesheet" type="text/css" href="node_modules/label-maker-js/dist/label-maker-js/css/otusjs-label-page.min.css"/></head><body></body></html>');
        angular.element(newWindow.document.body)
        .append($element.contents());
      }

    }
    return ddo;
  }
}());
