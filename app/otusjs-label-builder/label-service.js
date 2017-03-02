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
    self.getTubesList = getTubesList;
    self.getBaseInfo = getBaseInfo;
    self.pushInfo = pushInfo;

    function _init() {
      //DataBuilderService.fetchTubesData();
    }

    function pushInfo(json) {
      return DataBuilderService.pushInfo(json);
    }

    function getBaseInfo() {
      return DataBuilderService.getBaseInfo();
   }

    function getTubesList($scope) {
      return DataBuilderService.getTubesList();
    }

  }
}());
