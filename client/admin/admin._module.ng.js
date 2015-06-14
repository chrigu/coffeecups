var adminModule = angular.module('coffeeCups.admin', [
    'angular-meteor', 'ui.router', 'angucomplete', 'angularLoad', 'ngGeolocation', 'uiGmapgoogle-maps',
    'ui.bootstrap'
]);

adminModule.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})

