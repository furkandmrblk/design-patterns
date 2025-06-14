import { ConcreteFactoryA, ConcreteFactoryB, Factory, Product } from "./factory";

function main() {
    const factoryA: Factory = new ConcreteFactoryA();
    const productA: Product = factoryA.factoryMethod();
    productA.display();

    const factoryB: Factory = new ConcreteFactoryB();
    const productB: Product = factoryB.factoryMethod();
    productB.display();

    return 0;
};

main();
