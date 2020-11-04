(function() {
  'use strict';

  angular
    .module('otusjs.labelMaker.setupView')
    .component('labelMaker', {
      templateUrl: 'app/otusjs-main-view/main-view-template.html',
      controller: Controller,
      bindings: {
        labelData: '<'
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
      scope.labelData = {
        birthday: "9/7/2020",
        cq_group: "Nenhum",
        gender: "M",
        participant_name: "Adriano",
        printStructure: {
          columns: 1,
          identified: {value: true, name: "Sim"},
          labelSize: {value: "bigger", name: "Padrao"},
          type: {value: "qrcode", name: "Qrcode"}
        },
        recruitment_number: 1074830,
        tubes: [
          {
            aliquots: [],
            availableAliquots: [],
            code: "361122646",
            groupName: "Default",
            label: "Gel Jejum",
            momentLabel: "Jejum",
            objectType: "Tube",
            printStructure: {
              quantity: 4,
              selected: true
            },
            type: "Gel",
            typeLabel: "Gel"
          }, {
            aliquots: [],
            availableAliquots: [],
            code: "361122646",
            groupName: "Default",
            label: "Gel Jejum",
            momentLabel: "Jejum",
            objectType: "Tube",
            printStructure: {
              quantity: 4,
              selected: true
            },
            type: "Gel",
            typeLabel: "Gel"
          }
        ]
      }
      var labelPage = $compile(LABEL_PAGE)(scope);
    }

  }
}());
