export abstract class Product {
    public abstract display(): void;
}

export abstract class Factory {
    public abstract factoryMethod(): Product;
}

export class ConcreteFactoryA extends Factory {
    public override factoryMethod(): Product {
        return new ConcreteProductA();
    } 
}

export class ConcreteFactoryB extends Factory {
    public override factoryMethod(): Product {
        return new ConcreteProductB();
    } 
}

class ConcreteProductA implements Product {
    public display(): void {
        return console.log("Concrete product A was called!");
    }
}

class ConcreteProductB implements Product {
    public display(): void {
        return console.log("Concrete product B was called!");
    }
}