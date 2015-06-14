angular.module('coffeeCups.core')
    .directive('ccScore', function() {
        return {
            scope: {
                name: '@',
                score: '=',
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

        function activate() {
            self.name = $scope.name;
            self.score = $scope.score;
            self.max = parseInt($scope.max);
        }

    }]);
