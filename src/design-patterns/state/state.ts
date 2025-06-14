export class VendingMachineContext {
    private state!: VendingMachineState;

    setState(state: VendingMachineState): void {
        this.state = state;
    }

    request(): void {
        this.state.handleRequest();
    }
}

interface VendingMachineState {
    handleRequest(): void;
}

export class StateReady implements VendingMachineState {
    handleRequest(): void {
        console.log("Vending machine is ready, please select a product.");
    }
}

export class StateProductSelected implements VendingMachineState {
    handleRequest(): void {
        console.log("Product was selected. Processing payment.");
    }
}

export class StatePaymentPending implements VendingMachineState {
    handleRequest(): void {
        console.log("Payment pending.. Dispensing product afterwards.");
    }
}

export class StateOutOfStock implements VendingMachineState {
    handleRequest(): void {
        console.log("Product is unavailable, we're out of stock. Please select another product.");
    }
}