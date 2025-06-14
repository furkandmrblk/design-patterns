interface SupportHandler {
    handleRequest(request: CRRequest): void;
    setNextHandler(handler: SupportHandler): void;
}

export class Level1SupportHandler implements SupportHandler {
    private nextHandler!: SupportHandler;

    setNextHandler(handler: SupportHandler): void {
        this.nextHandler = handler;
    }

    handleRequest(request: CRRequest): void {
        if (request.getPriority() === Priority.BASIC) {
            console.log("Level 1 support handling request.", Priority.BASIC);
        } else {
            this.nextHandler.handleRequest(request);
        }
    }
}

export class Level2SupportHandler implements SupportHandler {
    private nextHandler!: SupportHandler;

    setNextHandler(handler: SupportHandler): void {
        this.nextHandler = handler;
    }

    handleRequest(request: CRRequest): void {
        if (request.getPriority() === Priority.INTERMEDIATE) {
            console.log("Level 2 support handling request.", Priority.INTERMEDIATE);
        } else {
            this.nextHandler.handleRequest(request);
        }
    }
}

export class Level3SupportHandler implements SupportHandler {
    setNextHandler(_handler: SupportHandler): void {}

    handleRequest(request: CRRequest): void {
        if (request.getPriority() === Priority.CRITICAL) {
            console.log("Level 3 support handling request.", Priority.CRITICAL);
        } else {
            console.log("Request cannot be handled.");
        }
    }
}



export class CRRequest {
    private priority: Priority;

    constructor(priority: Priority) {
        this.priority = priority;
    }

    getPriority(): Priority {
        return this.priority;
    }
}

export enum Priority {
    BASIC,
    INTERMEDIATE,
    CRITICAL
}