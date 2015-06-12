
angular.module('coffeeCup.admin')
    .controller('AdminLoginController', function ($meteor) {

        var self = this;

        activate();


        function addCoffeeBar(dataObj) {
            console.log(dataObj);
            // Simple POST request example (passing data) :
            $http.post('http://127.0.0.1:8000/coffee/combined', dataObj).
                success(function(data, status, headers, config) {
                    self.infoClass = "success";
                    self.infoText = "Successfully added coffee!"
                    form.$setPristine();
                }).
                error(function(data, status, headers, config) {
                    self.infoClass = "fail";
                    self.infoText = "An error occured while adding the data. Please try again!"
                });
        }

        self.add = function(form) {

            var coffeeBar;

            console.log(self.coffeeBar.name);

            //console.log(self.image);

            if (form.$valid) {

                if (self.selectedCoffeeBar) {
                    coffeeBar = self.selectedCoffeeBar.originalObject;
                    self.showBarDetails = false;
                    console.log(coffeeBar);
                } else {
                    coffeeBar = {
                        name: self.coffeeBar.name,
                        address: self.coffeeBar.address,
                        city: self.coffeeBar.city,
                        country: self.coffeeBar.country
                    }
                    $meteor.call('barInsert', coffeeBar);
                }

                //add Bar
                //self.coffeeBars.push(coffeeBar);
                console.log(coffeeBar);


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
            self.coffeeBar = {};
            self.coffee = {};
            self.coffeeBars = $meteor.collection(CoffeeBars);
            self.coffeeTypes = $meteor.collection(CoffeeTypes);
        }


    });


