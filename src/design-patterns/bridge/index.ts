import { Assemble, Bike, Car, Produce } from "./bridge";


function main() {
    const produce = new Produce();
    const assemble = new Assemble();

    const car = new Car(produce, assemble);
    car.manufacture();

    const bike = new Bike(produce, assemble);
    bike.manufacture();

    return 0;
};

main();
