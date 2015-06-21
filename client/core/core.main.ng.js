
angular.module('coffeeCups.core')
    .controller('MainController', function ($scope, $meteor, locationService, $state, coffees, coffeeBars) {

        var self = this;
        activate();

        self.showCoffee = function(id) {
            $state.go("coffee", {uid: id});
        };

        $scope.$on('$destroy', function() {
            coffees.stop();
            coffeeBars.stop();
        });

        function getBarsOnMap(boundingBox) {

            // minimong does not support $geoWithin, so we get the diagonal of the bounding box
            // and use a circle so that we can use $near from the center of the map with
            // the diagonal as $maxDistance

            var diameter;

            console.log(boundingBox);
            //var box = [
            //    [boundingBox.southwest.longitude, boundingBox.southwest.latitude],
            //    [boundingBox.northeast.longitude, boundingBox.northeast.latitude]
            //];
            diameter = locationService.getDistance(boundingBox.southwest, boundingBox.northeast);
            console.log(diameter);

            self.mapCoffeeBars = $meteor.collection(function() {
                console.log(self.map);
                var latlng = [self.map.center.longitude, self.map.center.latitude];
                return CoffeeBars.find({
                    "position": {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: latlng
                            },
                            $maxDistance: diameter   //meters
                        }
                    }
                });
            });
            console.log(self.mapCoffeeBars);
        }

        function activate() {
            self.searchLocation = "";
            self.bestCoffees = $meteor.collection(function() {
                return Coffees.find({}, {sort: {score: -1}, limit: 10});
            });
            self.coffeeBars = $meteor.collection(CoffeeBars, false);
            self.allCoffees = $meteor.collection(Coffees, false);
            self.nearCoffeeBars = [];
            self.mapCoffeeBars = [];
            self.location = {};



            locationService.getLocation().then(function(position) {
                self.location = position;
                self.map = {
                    center: {
                        latitude: self.location.coords.latitude,
                        longitude: self.location.coords.longitude
                    },
                    zoom: 14,
                    bounds: {},
                    events: {
                        dragend: function() {
                            getBarsOnMap(self.map.bounds);
                        }
                    }
                };


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

                //getBarsOnMap(self.map.bounds);
            });
        }

    });

