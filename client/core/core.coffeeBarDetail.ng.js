
angular.module('coffeeCups.core')
    .controller('CoffeeBarDetailController', function ($scope, $meteor, $geolocation, $stateParams, coffeeBar, coffeesForBar, leafletData) {

        var self = this;
        activate();

        $scope.$on('$destroy', function() {
            coffeeBar.stop();
            coffeesForBar.stop();
        });

        self.changeCoffee = function(coffee) {
            self.selectedCoffee = coffee;
            $scope.$broadcast('coffee:change', self.selectedCoffee);
        };

        function activate() {
            self.coffeeBar = $meteor.object(CoffeeBars, $stateParams.uid);
            self.coffees = $meteor.collection(Coffees);
            self.selectedCoffee = self.coffees[0];

            //pre-select the right coffee
            if ($stateParams.coffeeType) {
                var coffeeWithType = _.find(self.coffees, {'coffeeType': $stateParams.coffeeType});
                console.log(coffeeWithType);
                if (coffeeWithType) {
                    self.selectedCoffee = coffeeWithType;
                }
            }
            console.log(self.coffeeBar.position);

            var latLng = L.latLng(self.coffeeBar.position.coordinates[1], self.coffeeBar.position.coordinates[0]);
            leafletData.getMap().then(function(map) {
                map.setView(latLng, 15);
            });

            //self.layers =  {
            //    baselayers: {
            //        xyz: {
            //            name: 'OpenStreetMap (XYZ)',
            //            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            //            type: 'xyz'
            //        }
            //    },
            //    overlays: {}
            //};
            self.markers =  {
                bar: {
                    lat: self.coffeeBar.position.coordinates[1],
                    lng: self.coffeeBar.position.coordinates[0],
                    focus: false,
                    title: self.coffeeBar.name,
                    draggable: false
                }
            };


            //$meteor.subscribe("coffeesForBar", self.coffeeBar._id).then(function(handle){
            //    self.coffees = $meteor.collection(Coffees);
            //    console.log(self.coffees);
            //    subscription = handle;
            //});
        }
    });
