CoffeeBars = new Mongo.Collection('coffeeBars');

Meteor.methods({
    barInsert: function(barAttributes, coffeeAttrbutes) {
        console.log(this.userId);
        check(this.userId, String);
        check(barAttributes, {
            name: String,
            city: String,
            country: String,
            coords: Match.ObjectIncluding(
                {latitude: Number, longitude: Number})
        });

        var update = false;

        //var errors = validatePost(postAttributes);
        //if (errors.title || errors.url)
        //    throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

        var coffeeBar = CoffeeBars.findOne({name: barAttributes.name, city: barAttributes.city});
        if (coffeeBar) {
            //return {
            //    barExists: true,
            //    _id: barWithSameName._id
            //}
            update = true;
        }

        var user = Meteor.user();
        var bar = _.extend(barAttributes, {
            userId: user._id,
            //author: user.username,
            submitted: new Date(),
            position: { type: "Point", coordinates: [ parseFloat(barAttributes.coords.longitude), parseFloat(barAttributes.coords.latitude) ] }
        });
        console.log(bar);

        if (update) {
            //TODO: use old user
            CoffeeBars.update(coffeeBar._id, {$set: bar});
            coffeeBarId = coffeeBar._id;
        } else {
            coffeeBarId = CoffeeBars.insert(bar)
        }

        var coffee = _.extend(coffeeAttrbutes, {
            barId: coffeeBarId.toString(),
            barName: bar.name
        });
        console.log(coffee);

        Meteor.call('coffeeInsert', coffee, function(error, result) {
            console.log(error);
            console.log(result);
        });

        //var barId = CoffeeBars.insert(bar);

        return {
            _id: coffeeBarId
        };
    }//,
    //barUpdate: function(barAttributes) {
    //    check(this.userId, String);
    //    check(barAttributes, {
    //        name: String,
    //        address: String,
    //        city: String,
    //        country: String,
    //        _id: String
    //    });
    //
    //    //var errors = validatePost(postAttributes);
    //    //if (errors.title || errors.url)
    //    //    throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
    //
    //    var barWithSameName = CoffeeBars.findOne({_id: barAttributes._id});
    //    if (!barWithSameName) {
    //        return {
    //            barExists: false
    //        }
    //    }
    //
    //    var user = Meteor.user();
    //    var bar = _.extend(barAttributes, {
    //        userId: user._id,
    //        //author: user.username,
    //        submitted: new Date()
    //    });
    //
    //    var barId = CoffeeBars.update(bar);
    //
    //    return {
    //        _id: barId
    //    };
    //}
})