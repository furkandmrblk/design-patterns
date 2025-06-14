import { DocumentOriginator, HistoryCareTaker } from "./memento";

function main() {
    const document = new DocumentOriginator("Initial content\n");
    const history = new HistoryCareTaker();
    history.addMemento(document.createMemento()); // Snapshot 0

    document.write("Additional content\n");
    history.addMemento(document.createMemento()); // Snapshot 1

    document.write("Even more content!\n");
    history.addMemento(document.createMemento()); // Snapshot 2

    document.write("Final content!\n");
    history.addMemento(document.createMemento()); // Snapshot 3

    
    document.restoreFromMemento(history.getMemento(2));
    console.log(document.getContent()); // Returns snapshot 2 because of line 18

    return 0;
};

main();
