import { AreaCalculator, Circle, Square, Triangle } from "./visitor";

function main() {
    const shapes = [
        new Circle(),
        new Square(),
        new Triangle(),
    ];

    const areaCalculator = new AreaCalculator();
    
    for (const shape of shapes) {
        shape.accept(areaCalculator);
    }

    console.log("total area: ", areaCalculator.getTotalArea());

    return 0;
};

main();
