export class Employee {
    private name: string;
    private salary: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    getSalary(): number {
        return this.salary;
    }
}

//* Abstract CustomIterator
interface CustomIterator<T> {
    hasNext(): boolean;
    nextItem(): T;
}

//* Abstract Aggregate
interface Aggregate<T> {
    createCustomIterator(): CustomIterator<T>;
}

//* Concrete CustomIterator
class EmployeeCustomIterator implements CustomIterator<Employee> {
    private employees: Array<Employee>
    private currentIndex: number = 0;

    constructor(employees: Array<Employee>) {
        this.employees = employees;
    }

    hasNext(): boolean {
        return this.currentIndex < this.employees.length;
    }

    nextItem(): Employee {
        if (this.hasNext()) {
            const employee =  this.employees[this.currentIndex];
            this.currentIndex += 1;
            return employee;
        }
        throw new Error("No employee left to iterate over.");
    }
}

//* Concrete Aggregate
export class Company implements Aggregate<Employee> {
    private employees: Array<Employee>;

    constructor(employees: Array<Employee>) {
        this.employees = employees;
    }

    createCustomIterator(): CustomIterator<Employee> {
        return new EmployeeCustomIterator(this.employees);
    }
}