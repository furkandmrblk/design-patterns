//* Abstraction
abstract class Vehicle {
    protected workshop: Workshop;
    protected workshop2: Workshop;

    constructor(workshop: Workshop, workshop2: Workshop) {
        this.workshop = workshop;
        this.workshop2 = workshop2;
    }

    public abstract manufacture(): void;
}

//* Refined Abstractions
export class Car extends Vehicle {
    constructor(workshop: Workshop, workshop2: Workshop) {
        super(workshop, workshop2);
    }

    public manufacture(): void {
        process.stdout.write("Car ");
        this.workshop.work();
        this.workshop2.work();
    }
}

export class Bike extends Vehicle {
    constructor(workshop: Workshop, workshop2: Workshop) {
        super(workshop, workshop2);
    }

    public manufacture(): void {
        process.stdout.write("Bike ");
        this.workshop.work();
        this.workshop2.work();
    }
}


//* Implementation
abstract class Workshop {
    public abstract work(): void;
}

//* Concrete Implementation 
export class Produce extends Workshop {
    public override work(): void {
        process.stdout.write("produced");
    }
}

export class Assemble extends Workshop {
    public override work(): void {
        process.stdout.write(" and assembled.\n");
    }
}