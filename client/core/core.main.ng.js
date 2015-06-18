
angular.module('coffeeCups.core')
    .controller('MainController', function ($scope, $meteor, $geolocation, $state, coffees, coffeeBars) {

        var self = this;
        activate();

        self.showCoffee = function(id) {
            $state.go("coffee", {uid: id});
        };

        $scope.$on('$destroy', function() {
            coffees.stop();
            coffeeBars.stop();
        });

        function activate() {
            //self.infoClass = "";
            self.bestCoffees = $meteor.collection(function() {
                return Coffees.find({}, {sort: {score: -1}, limit: 10});
            });
            self.coffeeBars = $meteor.collection(CoffeeBars, false);
            self.allCoffees = $meteor.collection(Coffees, false);
            self.nearCoffeeBars = [];
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
                //self.nearCoffeeBars = $meteor.collection(CoffeeBars).subscribe('nearCoffeeBars',
                //    [self.location.coords.longitude, self.location.coords.latitude]);
                self.nearCoffeeBars = $meteor.collection(function() {
                    var latlng = [self.location.coords.longitude, self.location.coords.latitude];
                    return CoffeeBars.find({
                        "position": {
                            $near: {
                                $geometry: {
                                    type: "Point",
                                    coordinates: latlng
                                },
                                $maxDistance: 20000   //meters
                            }
                        }
                    });
                });
                console.log(self.nearCoffeeBars);
            });
        }

    });

