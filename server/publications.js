Meteor.publish('coffees', function(options) {
    return Coffees.find({}, options);
});

Meteor.publish('coffee', function(id) {
    check(id, String);
    return Coffees.find({_id: id});
});

//Meteor.publish('bestCoffees', function(options) {
//    console.log("best");
//    return Coffees.find({}, {sort: {score: -1}, limit: 10});
//});

Meteor.publish('coffeesForBar', function(id) {
    check(id, String);
    return Coffees.find({barId: id});
});

Meteor.publish('coffeeBars', function(options) {
    //check(options, {
    //    sort: Object,
    //    limit: Number
    //});
    return CoffeeBars.find({}, options);
});

Meteor.publish('coffeeBar', function(id){
    check(id, String);
    return CoffeeBars.find({_id: id});
});

Meteor.publish('nearCoffeeBars', function (latlng) {
   if(latlng) {
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
   } else {
       return [];
   }
});

Meteor.publish('coffeeTypes', function(options) {
    //check(options, {
    //    sort: Object,
    //    limit: Number
    //});
    return CoffeeTypes.find({}, options);
});