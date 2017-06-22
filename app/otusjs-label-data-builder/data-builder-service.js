(function() {
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
      _tubesList,

      baseInfoModel = {
        cq_group: null,
        participant_name: null,
        recruitment_number: null,
        gender: null,
        birthday: null
      };

    self.fetchTubesData = fetchTubesData;
    self.getBaseInfo = getBaseInfo;
    self.getTubesList = getTubesList;
    self.pushInfo = pushInfo;

    function fetchTubesData() {
      _getInfo().getData().$promise
        .then(function(data) {
          _setInfo(data);
          $rootScope.$broadcast("Data_Ready", data);
        })
        .catch(function(err) {
          $rootScope.$broadcast("Data_Error", err); //TODO set listener
        });
    }

    function getBaseInfo() {
      return _baseInfo;
    }

    function getTubesList() {
      return _tubesList;
    }

    function _setInfo(data) {
      angular.extend(_baseInfo, baseInfoModel, data);
      _tubesList = data.tubes;
    }

    function pushInfo(labParticipant) {
      if (labParticipant) {
        var parse = labParticipant;
        _setInfo(parse);
      } else {
        fetchTubesData();
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
