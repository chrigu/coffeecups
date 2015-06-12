
angular.module('coffeeCup.core')
    .controller('CoffeeDetailController', function ($scope, $meteor, $geolocation, $stateParams) {

        var self = this;
        activate();

        function activate() {
            self.coffee = $meteor.object(Coffees, $stateParams.uid);
            self.coffeeBar = $meteor.object(CoffeeBars, self.coffee.barId)
            console.log(self.coffee);
            console.log(self.coffeeBar);
        }

    });
