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
