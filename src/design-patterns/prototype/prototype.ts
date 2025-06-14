interface PrototypeInterface {
    clone(): PrototypeInterface;
    doSomething(): void;
}

export class ConcretePrototype implements PrototypeInterface {
    private foo: string;

    constructor(foo: string) {
        this.foo = foo;
    }

    clone(): PrototypeInterface {
        return new ConcretePrototype(this.foo);
    }

    doSomething(): void {
        console.log("We did something here.");
    }
}

export class Client {
    private prototype: ConcretePrototype;

    constructor(prototype: ConcretePrototype) {
        this.prototype = prototype;
    }

    public createPrototype() {
        return this.prototype.clone();
    }
}