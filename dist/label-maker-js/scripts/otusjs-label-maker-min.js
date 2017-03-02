(function() {
    'use strict';

    angular
        .module('otusjs.labelMaker', [
            /* External dependencies */
            'ngMaterial',
            'ngMessages',
            'ngAnimate',
            'ui.router',
            'angular-bind-html-compile',
            /* Standalone dependencies */
            'otusjs.labelMaker.config',
            'otusjs.labelMaker.setupView',
            'otusjs.labelMaker.dataBuilder',
            'otusjs.labelMaker.labelBuilder',
            'otusjs.labelMaker.labelPage'
        ]);

}());

(function() {
    'use strict';

    angular
        .module('otusjs.labelMaker.config', []);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.labelMaker.config')
    .config(stateConfiguration);

  stateConfiguration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function stateConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state('index', {
        url: '/index',
        template: '<setup-component></setup-component>',
        resolve:{}
      });

    $urlRouterProvider.otherwise('/index');
    $locationProvider.html5Mode(true);
  }

}());

(function() {

    angular
        .module('otusjs.labelMaker.config')
        .config(themeConfiguration);

    themeConfiguration.$inject = ['$mdThemingProvider', '$mdIconProvider'];

    function themeConfiguration($mdThemingProvider, $mdIconProvider) {

        $mdThemingProvider.theme('layoutTheme')
            .primaryPalette('teal', {
                'hue-1': '600',
                'hue-2': '50',
                'hue-3': '700'
            }).accentPalette('blue-grey', {
                'default': '900',
                'hue-1': '50'
            }).warnPalette('red');


        /*Configuration icons*/
        /* 24 is the size default of icons */
        $mdIconProvider.defaultIconSet('app/assets/icons/mdi.svg', 24);
    }

}());

(function() {

    angular
        .module('otusjs.labelMaker.config')
        .config(['$mdDateLocaleProvider', localeConfiguration]);

    function localeConfiguration($mdDateLocaleProvider) {

        $mdDateLocaleProvider.formatDate = function(date) {
            if (Object.prototype.toString.call(date) !== '[object Date]') {
                return null;
            }
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return day + '/' + (monthIndex + 1) + '/' + year;
        };

        $mdDateLocaleProvider.parseDate = function(dateString) {
            date = new Date(dateString);
            if (Object.prototype.toString.call(date) !== '[object Date]') {
                return date;
            } else {
                newDateString = dateString.split('/');
                if (newDateString.length === 3) {
                    date = new Date(newDateString[2], newDateString[1]-1, newDateString[0]);
                    return date;
                }
            }
        };
    }

}());

(function() {
  'use strict';
  
  angular
    .module('otusjs.labelMaker.setupView',[]);
}());

(function() {
  'use strict';

  angular
    .module('otusjs.labelMaker.setupView')
    .component('setupComponent', {
      template:'<div layout="row" layout-align="center center"><md-button class="md-raised md-primary" ng-click="$ctrl.generateLabelPage()">Gerar Etiquetas</md-button></div>',
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

(function() {
  'use strict';

  angular
    .module('otusjs.labelMaker.labelBuilder',[
      'otusjs.labelMaker.labelBuilder.labelComponents'
    ]);
}());

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

(function() {
  'use strict';

  angular
    .module('otusjs.labelMaker.labelBuilder.labelComponents')
    .component('tubesLabel', {
      transclude: true,
      template:'<div class="label"><div class="label-text"><h3>{{$ctrl.tube.type}}</h3><span>{{$ctrl.base.participant_name}}</span><br><span>NR:{{$ctrl.base.recruitment_number}} Sexo:{{$ctrl.base.gender}}</span><br><span>DN:{{$ctrl.base.birthday}}</span><br></div><svg id="{{$ctrl.tube.code}}" class="barcode"></svg></div>',
      controller: Controller,
      bindings: {
        base: '<',
        tube: '<'
      }
    });

  Controller.$inject = [
    '$scope',
    '$element',
    '$compile',
    'BARCODE_SETTINGS'
  ];

  function Controller($scope, $element, $compile, BARCODE_SETTINGS) {
    var self = this;

    self.renderBarcode = renderBarcode;

    self.$onInit = function() {
      $compile($element.contents())($scope);
      renderBarcode();
    };

    function renderBarcode() {
      var barcodeContainer = $element.find('svg')[0];
      JsBarcode(barcodeContainer, self.tube.code, BARCODE_SETTINGS);
    }
  }
}());

(function() {
    'use strict';

    angular
      .module('otusjs.labelMaker.labelBuilder.labelComponents')
      .component('participantLabel', {
          transclude: true,
          template:'<div class="label"><div class="label-text"><h3>{{$ctrl.base.participant_name}}</h3><span>CQ:{{$ctrl.base.cq_group}}</span><br></div><svg id="{{$ctrl.base.recruitment_number}}" class="barcode"></svg></div>',
          controller: Controller,
          bindings: {
            base: '<'
          }
      });

      Controller.$inject = [
        '$scope',
        '$element',
        '$compile',
        'BARCODE_SETTINGS'
      ];

      function Controller($scope, $element, $compile, BARCODE_SETTINGS) {
        var self = this;

        self.renderBarcode = renderBarcode;

        self.$onInit = function() {
          $compile($element.contents())($scope);
          renderBarcode();
        };

        function renderBarcode() {
          var barcodeContainer = $element.find('svg')[0];
          JsBarcode(barcodeContainer, self.base.recruitment_number, BARCODE_SETTINGS);
        }
      }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.labelMaker.labelPage', []);
}());

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
      template:'<input class="no-print print-button button" type="button" value="Imprimir" onclick="window.print()"><div id="print-page" layout-align="start center" ng-if="$ctrl.loadComponents"><participant-label base="$ctrl.baseInfo"></participant-label><tubes-label base="$ctrl.baseInfo" tube="tube" ng-repeat="tube in $ctrl.tubesList track by $index"></tubes-label></div>',
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
        newWindow.document.write('<html><head><title>Etiquetas</title><link rel="stylesheet" type="text/css" href="../node_modules/label-maker-js/app/assets/otusjs-label-page.css"/></head><body></body></html>');
        angular.element(newWindow.document.body)
          .append($element.contents());
      }

    }
    return ddo;
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.labelMaker.dataBuilder',['ngResource']);
}());

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

    function pushInfo(json) {
      if (json) {
        var parse = _fromJson(json);
        _setInfo(parse);
      } else {
        fetchTubesData();
      }
    }

    function _fromJson(json) {
      return JSON.parse(json);
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
