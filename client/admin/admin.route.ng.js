angular.module("coffeeCups.admin").run(function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $state.go('main');
    }
  });
});

angular.module('coffeeCups.admin').config(function ($stateProvider) {

    $stateProvider.state('adminLogin', {
        url: '/restricted/login',
        templateUrl: 'client/admin/admin.login.ng.html'
        //controller: 'AdminLoginController',
        //controllerAs: 'ctrl'
    }).state('adminAdd', {
        url: '/restricted/add',
        templateUrl: 'client/admin/admin.add.ng.html',
        controller: 'AdminAddController',
        controllerAs: 'ctrl',
        resolve: {
            "currentUser": ["$meteor", function($meteor){
                return $meteor.requireUser();
            }]
        }
    });
});