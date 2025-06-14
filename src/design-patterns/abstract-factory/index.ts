import { EuropeanCarFactory, NorthAmericanCarFactory } from "./abstract-factory";

function main() {
    const europeanCarFactory = new EuropeanCarFactory();
    const europeanCar = europeanCarFactory.createCar();
    const europeanCarSpec = europeanCarFactory.createSpecification();

    europeanCar.assemble();
    europeanCarSpec.display();

    const northAmericanCarFactory = new NorthAmericanCarFactory();
    const northAmericanCar = northAmericanCarFactory.createCar();
    const northAmericanCarSpec = northAmericanCarFactory.createSpecification();

    northAmericanCar.assemble();
    northAmericanCarSpec.display();

    return 0;
};

main();
