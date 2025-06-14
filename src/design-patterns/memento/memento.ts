//* Originator
export class DocumentOriginator {
    private content: string;
    
    constructor(content: string) {
        this.content = content;
    }

    write(text: string): void {
        this.content += text;
    }

    getContent(): string {
        return this.content;
    }

    createMemento(): DocumentMemento {
        return new DocumentMemento(this.content);
    }

    restoreFromMemento(memento: DocumentMemento): void {
        this.content = memento.getSavedContent();
    }
}

//* Memento
export class DocumentMemento {
    private content: string;

    constructor(content: string) {
        this.content = content;
    }

    getSavedContent(): string {
        return this.content;
    }
}

//* Caretaker
export class HistoryCareTaker {
    private mementos: Array<DocumentMemento> = [];

    getMemento(index: number): DocumentMemento {
        if (index >= this.mementos.length || index < 0) {
            throw new Error("Out of bounds.");
        }

        return this.mementos[index];
    }

    addMemento(memento: DocumentMemento): void {
        this.mementos.push(memento);
    }
}