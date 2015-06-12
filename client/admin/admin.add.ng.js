
angular.module('coffeeCup.admin')
    .controller('AdminAddController', function ($scope, $meteor, $geolocation, angularLoad) {

            var self = this;
            activate();

            function addCoffeeBar(dataObj) {
                console.log(dataObj);
                // Simple POST request example (passing data) :
                $http.post('http://127.0.0.1:8000/coffee/combined', dataObj).
                    success(function(data, status, headers, config) {
                        self.infoClass = "success";
                        self.infoText = "Successfully added coffee!";
                        form.$setPristine();
                    }).
                    error(function(data, status, headers, config) {
                        self.infoClass = "fail";
                        self.infoText = "An error occured while adding the data. Please try again!"
                    });
            }

            self.pickFile = function() {
                filepicker.pick(
                    function(Blob){
                        console.log(Blob.url);
                        self.coffee.imageUrl = Blob.url;
                    }
                );
            }

            self.add = function(form) {

                var coffeeBar;

                console.log(self.coffeeBar);

                //console.log(self.image);

                if (form.$valid) {

                    if (self.selectedCoffeeBar) {
                        self.showBarDetails = false;
                        console.log(self.coffeeBar);
                        //$meteor.call('barInsert', self.coffeeBar, self.coffee);
                    } else {
                        console.log(self.coffeeBar);
                    }

                    coffeeBar = {
                        name: self.coffeeBar.name,
                        coords: {
                            latitude: self.location.coords.latitude,
                            longitude: self.location.coords.longitude
                        },
                        city: self.coffeeBar.city,
                        country: self.coffeeBar.country
                    }
                    console.log(coffeeBar);
                    self.coffee.coffeeType = self.coffeeType.name;

                    //$meteor.call('barInsert', coffeeBar, self.coffee);
                    $meteor.call('barInsert', coffeeBar, self.coffee);

                    //add Bar
                    //self.coffeeBars.push(coffeeBar);
                    console.log(self.coffeeBar);


                    var dataObj = {
                        'coffeeBar': coffeeBar,
                        'coffee': self.coffee
                    }
                    console.log(dataObj);

                }
            }

            function activate() {
                //self.infoClass = "";
                self.showBarDetails = true;
                self.selectedCoffeeBar = null;
                self.location = {
                    coords: {latitude: 0, longitude: 0},
                    options: {
                        draggable: true
                    },
                    events: {
                        dragend: function (marker, eventName, args) {
                            console.log('marker dragend');
                            var lat = marker.getPosition().lat();
                            var lon = marker.getPosition().lng();
                            self.coffeeBar.coords = {latitude: lat, longitude: lon};
                        }
                    }
                };
                self.coffeeBar = {};
                self.coffee = {};

                self.coffeeBars = $meteor.collection(CoffeeBars);
                self.coffeeTypes = $meteor.collection(CoffeeTypes);

                $geolocation.getCurrentPosition({
                    timeout: 60000
                }).then(function(position) {
                    self.myPosition = position;
                    console.log(self.myPosition);
                    self.map = {center: {latitude: self.myPosition.coords.latitude,
                        longitude: self.myPosition.coords.longitude },
                        zoom: 14 };
                    self.location.coords = self.myPosition.coords;
                    console.log(self.location.coords);
                });

                self.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

                angularLoad.loadScript('http://api.filepicker.io/v1/filepicker.js').then(function() {
                    // TODO: move to settings file
                    filepicker.setKey("key");
                }).catch(function() {
                    console.log("filepicker load error");
                });
            }

            $scope.$watch(angular.bind(self, function () {
                return self.selectedCoffeeBar;
            }), function (newVal) {
                console.log(newVal);
                if(newVal && newVal.originalObject !== null) {
                    self.coffeeBar = newVal.originalObject;
                }
            });
        });


