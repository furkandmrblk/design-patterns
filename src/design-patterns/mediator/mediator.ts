//* Colleague Interface
interface Airplane {
    requestTakeoff(): void;
    requestLanding(): void;
    notifyAirTrafficControl(msg: string): void;
}

//* Concrete Colleague
export class CommercialAirplane implements Airplane {
    private mediator: AirTrafficControlTower;

    constructor(mediator: AirTrafficControlTower) {
        this.mediator = mediator;
    }

    requestLanding(): void {
        this.mediator.requestLanding(this);
    }

    requestTakeoff(): void {
        this.mediator.requestTakeoff(this);
    }

    notifyAirTrafficControl(msg: string): void {
        console.log("Commercial airplane: ", msg);
    }
}


//* Mediator Interface
interface AirTrafficControlTower {
    requestTakeoff(airplane: Airplane): void;
    requestLanding(airplane: Airplane): void;
}

//* Concrete Mediator 
export class AirportControlTower implements AirTrafficControlTower {
    requestLanding(airplane: Airplane): void {
        airplane.notifyAirTrafficControl("Requesting landing clearance.");
    }

    requestTakeoff(airplane: Airplane): void {
        airplane.notifyAirTrafficControl("Requesting takeoff clearance.");
    }
}