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
