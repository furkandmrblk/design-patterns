import { AirportControlTower, CommercialAirplane } from "./mediator";

function main() {
    const airport = new AirportControlTower();
    const pegasus = new CommercialAirplane(airport);
    const lufthansa = new CommercialAirplane(airport);
    const ryanair = new CommercialAirplane(airport);

    pegasus.requestLanding();
    lufthansa.requestTakeoff();
    ryanair.requestTakeoff();

    return 0;
};

main();
