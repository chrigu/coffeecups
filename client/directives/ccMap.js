angular.module('coffeeCups.core')
    .directive('ccMap', function() {
        return {
            scope: {
                center: '=',
                zoom: '='
            },
            restrict: 'E',
            templateUrl: 'client/directives/ccMap.ng.html',
            replace: true,
            controller: 'ccMapCtrl',
            controllerAs: 'vm'
        };
    }).controller('ccMapCtrl', ['$scope', function($scope) {
        var self = this;

        activate();

        $scope.$on("ccMap:positionUpdate", function(event, position) {
            console.log(position.coords);

            self.map = {
                center: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                zoom: self.zoom
            };
            console.log(self.map);
        });

        function activate() {
            self.center = $scope.center;
            self.zoom = $scope.zoom;

            if (self.center) {
                self.map = {
                    center: self.center,
                    zoom: self.zoom
                };
            } else {
                self.map = {
                    zoom: self.zoom
                };
            }
        }

    }]);
