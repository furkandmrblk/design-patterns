import { HotelKeeperImplementation } from "./facade";


function main() {
    const keeper = new HotelKeeperImplementation();

    const normalMenu = keeper.getNormalMenu();
    console.log("Normal: ", normalMenu);

    const vegetarianMenu = keeper.getVegetarianMenu();
    console.log("Vegetarian: ", vegetarianMenu);

    const veganMenu = keeper.getVeganMenu();
    console.log("Vegan: ", veganMenu);

    return 0;
};

main();
