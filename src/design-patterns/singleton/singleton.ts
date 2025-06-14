export class Singleton {
    private static instance: Singleton;

    private constructor() {
        console.log("Singleton is being instantiated.");
    }

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    public doSomething(): void {
        console.log("Database connection is established.");
    }

}

