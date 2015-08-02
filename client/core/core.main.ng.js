
angular.module('coffeeCups.core')
    .controller('MainController', function ($scope, $meteor, locationService, $state, coffees, coffeeBars, leafletData, $compile) {

        var self = this;
        activate();

        //handle events

        $scope.$on('$destroy', function() {
            coffees.stop();
            coffeeBars.stop();
        });

        $scope.$on("leafletDirectiveMap.dragend", function(event) {
            getBarsOnMap();
        });

        $scope.$on("leafletDirectiveMap.zoomend", function(event) {
            getBarsOnMap();
        });

        function setMarkers(coffeeBars) {
            coffeeBars.forEach(function (bar) {
                self.markers[bar._id] = {
                    lat: bar.position.coordinates[1],
                    lng: bar.position.coordinates[0],
                    focus: false,
                    title: bar.name,
                    message: "<a href='/coffeebar/" + bar._id + "'>" + bar.name + "</a>",
                    draggable: false
                };
            });
        }

        function getBarsOnMap() {

            // minimongo does not support $geoWithin, so we get the diagonal of the bounding box
            // and use a circle so that we can use $near from the center of the map with
            // the diagonal as $maxDistance
            leafletData.getMap().then(function(map) {
                var diameter, mapCoffeeBars;

                diameter = locationService.getDistance(map.getBounds()._southWest, map.getBounds()._northEast);

                //on the first call the diameter is 0 as the map isn't displayed, as such we'll just add a default
                //value (20km)

                if (diameter === 0) {
                    diameter = 20000;
                }

                mapCoffeeBars = $meteor.collection(function() {
                    var latlng = [map.getCenter().lng, map.getCenter().lat];
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
                setMarkers(mapCoffeeBars);
            });
        }

        self.showCoffee = function(coffee) {
            $state.go("coffeeBarCoffee", { uid: coffee.barId, coffeeType: coffee.coffeeType });
        };

        function activate() {
            self.searchLocation = "";
            self.bestCoffees = $meteor.collection(function() {
                //return Coffees.find({}, {sort: {score: -1}, limit: 10});
                return Coffees.find({}, {sort: {score: -1}});
            });
            self.coffeeBars = $meteor.collection(CoffeeBars, false);
            self.allCoffees = $meteor.collection(Coffees, false);
            self.nearCoffeeBars = [];
            self.mapCoffeeBars = [];
            self.nearCoffees = [];
            self.location = {};
            self.markers = {};
            self.showNear = true;

            // Todo: don't show map until position

            locationService.getLocation().then(function(position) {
                var nearBarsIds, latLng, mapContainer, leafletElement;

                latLng = L.latLng(position.coords.latitude, position.coords.longitude);
                nearBarsIds = [];
                self.location = position;

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

                nearBarsIds = _.pluck(self.nearCoffeeBars, '_id');
                self.nearCoffees = $meteor.collection(function() {
                    return Coffees.find({
                            barId: { $in: nearBarsIds }
                        }, {sort: {score: -1}}
                    );
                });

                mapContainer = angular.element(document.querySelector('.map-container'));
                leafletElement = $compile('<leaflet width="100%" height="480px" markers="vm.markers"></leaflet>')( $scope );
                mapContainer.append(leafletElement);

                leafletData.getMap().then(function(map) {
                    map.setView(latLng, 15);
                    getBarsOnMap();
                });

                self.showNear = false;
            });
        }

    });

