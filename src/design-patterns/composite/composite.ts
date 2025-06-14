//* Component
interface Task {
    getTitle(): string;
    setTitle(title: string): void;
    display(): void;
}

//* Leaf
export class SimpleTask implements Task {
    private title: string;

    constructor(title: string) {
        this.title = title;
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    display(): void {
        console.log("Simple task: " + this.title);
    }
}

//* Composite
export class TaskList implements Task {
    private title: string;
    private tasks: Array<Task>;

    constructor(title: string) {
        this.title = title;
        this.tasks = new Array();
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    addTask(task: Task): void {
        this.tasks.push(task);
    }

    removeTask(task: Task): void {
        const index = this.tasks.findIndex((val) => val == task);
        this.tasks = this.tasks.splice(index, 1);
    }

    display(): void {
        console.log("Task list: " + this.title);
        for (const task of this.tasks) {
            task.display();
        }
    }
}