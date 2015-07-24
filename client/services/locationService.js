angular.module('coffeeCups.core').factory('locationService', function($geolocation, $q) {
    var factory = {},
        location = undefined;


    function rad(x) {
        return x * Math.PI / 180;
    };

    //calculates distance between 2 points
    factory.getDistance = function(p1, p2) {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.lat - p1.lat);
        var dLong = rad(p2.lng - p1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    factory.getLocation = function() {

        if (!location) {
            return  $geolocation.getCurrentPosition( { timeout: 60000 }).then(function(position) {
                location = position;
                return position
            })
        } else {
            var deferred = $q.defer();
            deferred.resolve(location);
            return deferred.promise;
        }


    };
    return factory
});