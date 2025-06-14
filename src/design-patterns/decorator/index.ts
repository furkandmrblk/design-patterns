import { MilkDecorator, PlainCoffee, SugarDecorator } from "./decorator";


function main() {
    const coffee = new PlainCoffee();
    console.log("Price: $" + coffee.getCost() + "\tDescription: " + coffee.getDescription());

    const coffeeWithSugar = new SugarDecorator(coffee);
    console.log("Price: $" + coffeeWithSugar.getCost() + "\tDescription: " + coffeeWithSugar.getDescription());

    const coffeeWithMilk = new MilkDecorator(coffee);
    console.log("Price: $" + coffeeWithMilk.getCost() + "\tDescription: " + coffeeWithMilk.getDescription());

    const coffeeWithMilkAndSugar = new SugarDecorator(coffeeWithMilk);
    console.log("Price: $" + coffeeWithMilkAndSugar.getCost() + "\tDescription: " + coffeeWithMilkAndSugar.getDescription());

    return 0;
};

main();
