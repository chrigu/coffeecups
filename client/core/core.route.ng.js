angular.module("coffeeCups.core").config(function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'client/core/main.ng.html',
            controller: 'MainController',
            controllerAs: 'vm',
            data: {
                bodyClass: "main"
            },
            resolve: {
                'coffees': [
                    '$meteor', function($meteor) {
                        return $meteor.subscribe('coffees');
                    }
                ],
                'coffeeBars': [
                    '$meteor', function($meteor) {
                        return $meteor.subscribe('coffeeBars');
                    }
                ]
            }
        })
        .state('coffeeBar', {
            url: '/coffeebar/:uid',
            templateUrl: 'client/core/core.coffeeBarDetail.ng.html',
            controller: 'CoffeeBarDetailController',
            controllerAs: 'vm',
            data: {
                bodyClass: "coffeeBar"
            },
            resolve: {
                'coffeesForBar': [
                    '$meteor', '$stateParams', function($meteor, $stateParams) {
                        return $meteor.subscribe('coffeesForBar', $stateParams.uid);
                    }
                ],
                'coffeeBar': [
                    '$meteor', '$stateParams', function($meteor, $stateParams) {
                        return $meteor.subscribe('coffeeBar', $stateParams.uid);
                    }
                ]
            }
        })
        .state('coffeeBarCoffee', {
            url: '/coffeebar/:uid/:coffeeType',
            templateUrl: 'client/core/core.coffeeBarDetail.ng.html',
            controller: 'CoffeeBarDetailController',
            controllerAs: 'vm',
            data: {
                bodyClass: "coffeeBar"
            },
            resolve: {
                'coffeesForBar': [
                    '$meteor', '$stateParams', function($meteor, $stateParams) {
                        return $meteor.subscribe('coffeesForBar', $stateParams.uid);
                    }
                ],
                'coffeeBar': [
                    '$meteor', '$stateParams', function($meteor, $stateParams) {
                        return $meteor.subscribe('coffeeBar', $stateParams.uid);
                    }
                ]
            }
        });

    $urlRouterProvider.otherwise("/");
});

