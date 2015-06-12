Meteor.startup(function() {

    CoffeeBars._ensureIndex({ "position": "2dsphere"});
});