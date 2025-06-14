import { SimpleTask, TaskList } from "./composite";


function main() {
    const simpleTask = new SimpleTask("Complete coding");
    const simpleTask2 = new SimpleTask("Write documentation");

    const projectTasks = new TaskList("Project tasks");
    projectTasks.addTask(simpleTask);
    projectTasks.addTask(simpleTask2);

    const phaseOneTasks = new TaskList("Phase 1 Tasks");
    phaseOneTasks.addTask(new SimpleTask("Design"));
    phaseOneTasks.addTask(new SimpleTask("Implementation"));

    projectTasks.addTask(phaseOneTasks);

    projectTasks.display();

    return 0;
};

main();
