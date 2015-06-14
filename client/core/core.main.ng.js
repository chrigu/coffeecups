
angular.module('coffeeCups.core')
    .controller('MainController', function ($scope, $meteor, $geolocation, $state) {

        var self = this;
        activate();

        self.showCoffee = function(id) {
            $state.go("coffee", {uid: id});
        };

        function activate() {
            //self.infoClass = "";
            self.coffeeBars = $meteor.collection(CoffeeBars);
            self.allCoffees = $meteor.collection(Coffees).subscribe('coffees');
            self.nearCoffeeBars = [];
            self.bestCoffees = $meteor.collection(Coffees).subscribe('bestCoffees');
            self.location = {};


                $geolocation.getCurrentPosition({
                    timeout: 60000
                }).then(function(position) {
                    self.myPosition = position;
                    self.map = {center: {latitude: self.myPosition.coords.latitude,
                        longitude: self.myPosition.coords.longitude },
                        zoom: 14 };
                    self.location.coords = self.myPosition.coords;
                    console.log(self.location.coords);
                    self.nearCoffeeBars = $meteor.collection(CoffeeBars).subscribe('nearCoffeeBars',
                        [self.location.coords.longitude, self.location.coords.latitude]);
                });
        }

    });

