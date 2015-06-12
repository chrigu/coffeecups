
angular.module('coffeeCup.core')
    .controller('AppCtrl', function ($scope, $state) {

        var self = this;
        activate();

        function activate() {
            self.test = "default";
        }

        // this'll be called on every state change in the app
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            if (angular.isDefined(toState.data.bodyClass)) {
                self.bodyClass = toState.data.bodyClass;
                console.log(toState.data.bodyClass)
                return;
            }

            self.bodyClass = 'default';
        });

    });

