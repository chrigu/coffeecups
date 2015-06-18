
angular.module('coffeeCups.core')
    .controller('CoffeeBarDetailController', function ($scope, $meteor, $geolocation, $stateParams, coffeeBar, coffeesForBar) {

        var self = this;
        var subscription;
        activate();

        $scope.$on('$destroy', function() {
            coffeeBar.stop();
            coffeesForBar.stop();
        });

        function activate() {
            self.coffeeBar = $meteor.object(CoffeeBars, $stateParams.uid);
            self.coffees = $meteor.collection(Coffees);
            //$meteor.subscribe("coffeesForBar", self.coffeeBar._id).then(function(handle){
            //    self.coffees = $meteor.collection(Coffees);
            //    console.log(self.coffees);
            //    subscription = handle;
            //});
        }
    });
