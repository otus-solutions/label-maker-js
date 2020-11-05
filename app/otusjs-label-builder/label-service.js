(function() {
  'use strict';

  angular
    .module('otusjs.labelMaker.labelBuilder')
    .service('otusjs.labelMaker.labelBuilder.LabelService', Service);

  Service.$inject = [
     '$compile',
      'otusjs.labelMaker.dataBuilder.DataBuilderService',
    ];

  function Service($compile, DataBuilderService) {
    var self = this;

    _init();
    /* Public Interface */
    self.getBioMaterialList = getBioMaterialList;
    self.getBaseInfo = getBaseInfo;
    self.getLaboratoryInfo = getLaboratoryInfo;
    self.pushInfo = pushInfo;

    function _init() {
      //DataBuilderService.fetchTubesData();
    }

    function pushInfo(json) {
      return DataBuilderService.pushInfo(json);
    }

    function getLaboratoryInfo() {
      return DataBuilderService.getLaboratoryInfo();
    }

    function getBaseInfo() {
      return DataBuilderService.getBaseInfo();
   }

    function getBioMaterialList($scope) {
      return DataBuilderService.getBioMaterialList();
    }

  }
}());
