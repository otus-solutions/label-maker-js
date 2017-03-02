(function() {
  'use strict';

  angular
    .module('otusjs.labelMaker.setupView')
    .component('setupComponent', {
      templateUrl: 'app/otusjs-setup-view/setup-view-template.html',
      controller: Controller,
      bindings: {
        json: '='
      }
    });

  Controller.$inject = [
    '$scope',
    '$rootScope',
    '$compile',
    '$element',
    'otusjs.labelMaker.labelBuilder.LabelService'
  ];

  function Controller($scope, $rootScope, $compile, $element, LabelService) {
    var self = this;
    var LABEL_PAGE = '<label-page/>';

    self.generateLabelPage = generateLabelPage;

    $scope.$on("Data_Ready", function(event) {
      self.ready = true;
    });

    $scope.$on("Data_Error", function(event) {
      self.dataError = true;
    });

    function generateLabelPage() {
      var scope = $rootScope.$new();
      scope.json = self.json;
      var labelPage = $compile(LABEL_PAGE)(scope);
    }

  }
}());
