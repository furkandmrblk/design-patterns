import { Client, ConcretePrototype } from "./prototype";


function main() {
    const foo = new ConcretePrototype("foo!");
    const client = new Client(foo);
    const clone = client.createPrototype();
    clone.doSomething();

    return 0;
};

main();
