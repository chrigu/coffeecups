// Fixture data

var bar1, bar2, bar3;

if (CoffeeTypes.find().count() === 0) {


    CoffeeTypes.insert({
        name: "Espresso"
    });

    CoffeeTypes.insert({
        name: "Cappuccino"
    });

}

if (CoffeeBars.find().count() === 0) {
    bar1 = CoffeeBars.insert({
        name: "Adrianos",
        city: "Bern",
        address: "Some address",
        country: "CH",
        position: { type: "Point", coordinates: [ 7.4290529, 46.9320139 ] }
    });

    bar2 = CoffeeBars.insert({
        name: "Bubbles",
        city: "Lausanne",
        address: "Une adresse",
        country: "CH"
    });

    bar3 = CoffeeBars.insert({
        name: "Some coffee",
        city: "Chur",
        address: "Adressä 1",
        country: "CH"
    });

}

if (Coffees.find().count() === 0) {
    Coffees.insert({
        coffeeType: "Espresso",
        aroma: 3,
        accessories: 2,
        additional: 1,
        appearance: 2,
        barName: "Adrianos",
        barCity: "Bern",
        barId: bar1
    });
    Coffees.insert({
        coffeeType: "Cappuccino",
        aroma: 1,
        accessories: 2,
        additional: 1,
        appearance: 2,
        barName: "Adrianos",
        barCity: "Bern",
        barId: bar1
    });
    Coffees.insert({
        coffeeType: "Cappuccino",
        aroma: 1,
        accessories: 4,
        additional: 1,
        appearance: 2,
        barName: "Bubbles",
        barCity: "Lausanne",
        barId: bar2
    });
    Coffees.insert({
        coffeeType: "Cappuccino",
        aroma: 1,
        accessories: 4,
        additional: 1,
        appearance: 3,
        barName: "Some coffee",
        barCity: "Luzern",
        barId: bar3
    });
}
