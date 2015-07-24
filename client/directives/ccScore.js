angular.module('coffeeCups.core')
    .directive('ccScore', function() {
        return {
            scope: {
                title: '@',
                attribute: '@',
                coffee: '=',
                max: '@'
            },
            restrict: 'E',
            templateUrl: 'client/directives/ccScore.ng.html',
            replace: true,
            controller: 'ccScoreCtrl',
            controllerAs: 'vm'
        };
    }).controller('ccScoreCtrl', ['$scope', function($scope) {
        var self = this;

        activate();

        $scope.$on("coffee:change", function(event, coffee) {
            self.coffee = coffee;
        });

        function activate() {
            self.title = $scope.title;
            self.attribute = $scope.attribute;
            self.coffee = $scope.coffee;
            self.max = parseInt($scope.max);
        }

    }]);
