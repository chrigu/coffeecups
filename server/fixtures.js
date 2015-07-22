// Fixture data

var bar1, bar2, bar3, bar4;

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
        country: "CH",
        position: { type: "Point", coordinates: [ 6.66, 46.5 ] }
    });

    bar3 = CoffeeBars.insert({
        name: "Some coffee",
        city: "Chur",
        address: "Adressä 1",
        country: "CH",
        position: { type: "Point", coordinates: [ 9.5, 46.9 ] }
    });

    bar4 = CoffeeBars.insert({
        name: "Luna",
        city: "Bern",
        address: "Some bern address",
        country: "CH",
        position: { type: "Point", coordinates: [ 7.4220529, 46.9340139 ] }
    });

}

if (Coffees.find().count() === 0) {
    Coffees.insert({
        coffeeType: "Espresso",
        aroma: 6,
        accessories: 0,
        additional: 1,
        appearance: 1,
        atmosphere: 1,
        score: 9,
        barName: "Adrianos",
        barCity: "Bern",
        barId: bar1
    });
    Coffees.insert({
        coffeeType: "Cappuccino",
        aroma: 3,
        accessories: 1,
        additional: 0,
        appearance: 1,
        atmosphere: 1,
        score: 6,
        barName: "Adrianos",
        barCity: "Bern",
        barId: bar1
    });
    Coffees.insert({
        coffeeType: "Cappuccino",
        aroma: 3,
        accessories: -1,
        additional: 1,
        appearance: 0,
        atmosphere: 1,
        score: 4,
        barName: "Bubbles",
        barCity: "Lausanne",
        barId: bar2
    });
    Coffees.insert({
        coffeeType: "Cappuccino",
        aroma: 5,
        accessories: 0,
        additional: -1,
        appearance: -1,
        atmosphere: 1,
        barName: "Some coffee",
        barCity: "Luzern",
        barId: bar3
    });
    Coffees.insert({
        coffeeType: "Cappuccino",
        aroma: 4,
        accessories: 1,
        additional: 1,
        appearance: 0,
        atmosphere: 1,
        score: 7,
        barName: "Luna",
        barCity: "Bern",
        barId: bar4
    });
}
