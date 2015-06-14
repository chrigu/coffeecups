
angular.module('coffeeCups.core')
    .controller('CoffeeBarDetailController', function ($scope, $meteor, $geolocation, $stateParams) {

        var self = this;
        activate();

        function activate() {
            self.coffeeBar = $meteor.object(CoffeeBars, $stateParams.uid);
            self.coffees = $meteor.collection(Coffees).subscribe("coffeesForBar", self.coffeeBar._id);
            console.log(self.coffees);
            console.log(self.coffeeBar.name);
        }

    });
