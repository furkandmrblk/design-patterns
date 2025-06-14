// Abstract Product Interfaces
interface Car {
    assemble(): void;
}

interface CarSpecification {
    display(): void;
}

// Abstract Factory Interface
interface CarFactory {
    createCar(): Car;
    createSpecification(): CarSpecification;
}

// Concrete Factories
export class NorthAmericanCarFactory implements CarFactory {
    public createCar(): Car {
        return new Sedan();
    }

    public createSpecification(): CarSpecification {
        return new NorthAmericanCarSpecification();
    }
}

export class EuropeanCarFactory implements CarFactory {
    public createCar(): Car {
        return new Volkswagen();
    }

    public createSpecification(): CarSpecification {
        return new EuropeanCarSpecification();
    }
}

// Concrete Products
class Sedan implements Car {
    public assemble(): void {
        console.log("Assembling SEDAN");
    }
}

class Volkswagen implements Car {
    public assemble(): void {
        console.log("Assembling VOLKSWAGEN");
    }
}

class NorthAmericanCarSpecification implements CarSpecification {
    public display(): void {
        console.log("[North America]: Safety features compliant with local regulations.");
    }
}

class EuropeanCarSpecification implements CarSpecification {
    public display(): void {
        console.log("[Europe]: Fuel efficiency and emissions compliant with EU standards.")
    }
}