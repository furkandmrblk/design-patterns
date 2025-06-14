//* Component
interface Coffee {
    getDescription(): string;
    getCost(): number;
}

//* Concrete Component
export class PlainCoffee implements Coffee {
    getDescription(): string {
        return "Plain Coffee";
    }

    getCost(): number {
        return 2.00;
    }
}

//* Decorator
abstract class CoffeeDecorator implements Coffee {
    protected decoratedCoffee: Coffee;

    constructor(decoratedCoffee: Coffee) {
        this.decoratedCoffee = decoratedCoffee;
    }

    getDescription(): string {
        return this.decoratedCoffee.getDescription();
    }

    getCost(): number {
        return this.decoratedCoffee.getCost();
    }
}

export class MilkDecorator extends CoffeeDecorator {
    constructor(decoratedCoffee: Coffee) {
        super(decoratedCoffee);
    }

    getDescription(): string {
        return this.decoratedCoffee.getDescription() + ", Milk";
    }

    getCost(): number {
        return this.decoratedCoffee.getCost() + 0.5;
    }
}

export class SugarDecorator extends CoffeeDecorator {
    constructor(decoratedCoffee: Coffee) {
        super(decoratedCoffee);
    }

    getDescription(): string {
        return this.decoratedCoffee.getDescription() + ", Sugar";
    }

    getCost(): number {
        return this.decoratedCoffee.getCost() + 0.2;
    }
}

//* Concrete Decorator