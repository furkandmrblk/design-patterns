import { StateOutOfStock, StatePaymentPending, StateProductSelected, StateReady, VendingMachineContext } from "./state";

function main() {
    const vendingMachine = new VendingMachineContext();

    vendingMachine.setState(new StateReady());
    vendingMachine.request();

    vendingMachine.setState(new StateProductSelected());
    vendingMachine.request();

    vendingMachine.setState(new StatePaymentPending());
    vendingMachine.request();

    vendingMachine.setState(new StateOutOfStock());
    vendingMachine.request();

    return 0;
};

main();
