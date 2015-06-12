
angular.module('coffeeCup.core')
    .controller('CoffeeBarDetailController', function ($scope, $meteor, $geolocation, $stateParams) {

        var self = this;
        activate();

        function activate() {
            self.coffeeBar = $meteor.object(CoffeeBars, $stateParams.uid);
            console.log(self.coffeeBar.name);
        }

    });
