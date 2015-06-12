Coffees = new Mongo.Collection('coffees');

Meteor.methods({
    coffeeInsert: function(coffeeAttributes) {
        console.log(this.userId);
        check(this.userId, String);
        check(coffeeAttributes, {
            coffeeType: String,
            atmosphere: Number,
            aroma: Number,
            accessories: Number,
            additional: Number,
            appearance: Number,
            barId: String,
            barName: String,
            imageUrl: Match.Optional(String)
            //city: String
        });

        //var errors = validatePost(postAttributes);
        //if (errors.title || errors.url)
        //    throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

        var update, score;

        update = false;
        score = coffeeAttributes.aroma + coffeeAttributes.accessories + coffeeAttributes.additional +
        coffeeAttributes.appearance + coffeeAttributes.atmosphere;

        var coffeeExists = Coffees.findOne({barId: coffeeAttributes.barId, coffeeType: coffeeAttributes.coffeeType});
        console.log("exists" + coffeeExists);
        if (coffeeExists) {
            update = true;
        }

        var user = Meteor.user();
        var coffee = _.extend(coffeeAttributes, {
            userId: user._id,
            //author: user.username,
            submitted: new Date(),
            score: score
        });

        console.log(coffee);

        if (update) {
            coffee = Coffees.update(coffeeExists._id, {$set: coffee});
        } else {
            coffee = Coffees.insert(coffee);
        }

        return {
            _id: coffee._id
        };
    }
})