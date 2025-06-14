import { Company, Employee } from "./iterator";

function main() {
    const employees: Array<Employee> = [
        new Employee("Ahmet", 75_000),
        new Employee("Büsra", 80_000),
        new Employee("Caner", 85_000),
        new Employee("Derya", 90_000),
        new Employee("Eren", 95_000),
        new Employee("Furkan", 100_000),
        new Employee("Nihal", 105_000),
    ];

    const company = new Company(employees);
    const iter = company.createCustomIterator();

    let totalSalary = 0;

    while (iter.hasNext()) {
        totalSalary += iter.nextItem().getSalary();
    }

    console.log("Total salary: ", totalSalary);

    return 0;
};

main();
