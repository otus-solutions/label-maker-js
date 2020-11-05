(function () {
  'use strict';

  angular
    .module('otusjs.labelMaker.dataBuilder')
    .service('otusjs.labelMaker.dataBuilder.DataBuilderService', Service);

  Service.$inject = [
    '$rootScope',
    '$resource'
  ];

  function Service($rootScope, $resource) {
    var self = this,

      _baseInfo = {},
      _unattachedLaboratoryInfo = {},
      _bioMaterialList,
      baseInfoModel = {
        cq_group: null,
        participant_name: null,
        recruitment_number: null,
        gender: null,
        birthday: null
      },
      unattachedLaboratoryInfoModel = {
        cq_group: null,
        laboratoryIdentification: null,
        laboratoryFieldCenter: null
      };

    self.fetchBioMaterialData = fetchBioMaterialData;
    self.getBaseInfo = getBaseInfo;
    self.getLaboratoryInfo = getLaboratoryInfo;
    self.getBioMaterialList = getBioMaterialList;
    self.pushInfo = pushInfo;

    function fetchBioMaterialData() {
      _getInfo().getData().$promise
        .then(function (data) {
          _setInfo(data);
          $rootScope.$broadcast("Data_Ready", data);
        })
        .catch(function (err) {
          $rootScope.$broadcast("Data_Error", err); //TODO set listener
        });
    }

    function getBaseInfo() {
      return _baseInfo;
    }

    function getLaboratoryInfo() {
      return _unattachedLaboratoryInfo;
    }

    function getBioMaterialList() {
      return _bioMaterialList;
    }

    function _setInfo(data) {
      angular.extend(_baseInfo, baseInfoModel, data);
      angular.extend(_unattachedLaboratoryInfo, unattachedLaboratoryInfoModel, data);
      console.info("data",data)
      _bioMaterialList = data.tubes ? data.tubes : data.aliquots ;
    }

    function pushInfo(labParticipant) {
      if (labParticipant) {
        var parse = labParticipant;
        _setInfo(parse);
      } else {
        fetchBioMaterialData();
      }
    }

    function _getInfo() {
      var params = {
        participant_id: ''
      };

      return $resource('app/assets/participant-tubes-set.json', params, {
        getData: {
          method: 'GET',
          isArray: false
        }
      });
    }
  }
}());
