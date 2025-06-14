import { BurgerBuilder, BurgerDirector } from "./builder";

function main() {
    // Manual construction of a burger.
    const burgerBuilder = new BurgerBuilder();
    const burger = burgerBuilder.addBuns("Sesame Bun").addPatty("Crispy Chicken").addCheese("American Cheese").build();
    console.log("Manually assembled burger:\n ", burger);

    // Construction via director, that manages a certain variant of the burger implementation.
    const burgerDirector = new BurgerDirector(burgerBuilder)
    const burger2 = burgerDirector.constructBurger();
    console.log("Automatically assembled burger: \n", burger2);

    return 0;
};

main();
