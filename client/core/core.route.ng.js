angular.module("coffeeCup.core").config(function($urlRouterProvider, $stateProvider, $locationProvider){

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'client/core/main.ng.html',
                controller: 'MainController',
                controllerAs: 'vm',
                data: {
                    bodyClass: "main"
                }
            })
            .state('coffee', {
                url: '/coffee/:uid',
                templateUrl: 'client/core/core.coffeeDetail.ng.html',
                controller: 'CoffeeDetailController',
                controllerAs: 'vm',
                data: {
                    bodyClass: "coffee"
                }
            })
            .state('coffeeBar', {
                url: '/coffeebar/:uid',
                templateUrl: 'client/core/core.coffeeBarDetail.ng.html',
                controller: 'CoffeeBarDetailController',
                controllerAs: 'vm',
                data: {
                    bodyClass: "coffeeBar"
                }
            });

        $urlRouterProvider.otherwise("/");
    });

