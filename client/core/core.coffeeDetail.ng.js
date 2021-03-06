
angular.module('coffeeCups.core')
    .controller('CoffeeDetailController', function ($scope, $meteor, $stateParams, coffee) {

        var self = this;
        activate();

        $scope.$on('$destroy', function() {
            coffee.stop();
        });

        function activate() {
            self.coffee = $meteor.object(Coffees, $stateParams.uid);
            self.coffeeBar = $meteor.object(CoffeeBars, self.coffee.barId).subscribe("coffeeBar", self.coffee.barId);
            console.log(self.coffee);
            console.log(self.coffeeBar);
        }

    });
