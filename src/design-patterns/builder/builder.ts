// Product
class Burger {
    public buns: string | undefined;
    public patty: string | undefined;
    public cheese: string | undefined;

    constructor() {
        this.buns = undefined;
        this.patty = undefined;
        this.cheese = undefined;
    }

    public setBuns(buns: string): void {
        this.buns = buns;
    }

    public setPatty(patty: string): void {
        this.patty = patty;
    }

    public setCheese(cheese: string): void {
        this.cheese = cheese;
    }
}

// Builder
export class BurgerBuilder {
    constructor(public burger: Burger = new Burger()) {}

    public addBuns(buns: string): BurgerBuilder {
        this.burger.setBuns(buns);
        return this;
    }

    public addPatty(patty: string): BurgerBuilder {
        this.burger.setPatty(patty);
        return this;
    }

    public addCheese(cheese: string): BurgerBuilder {
        this.burger.setCheese(cheese);
        return this;
    }

    public build() {
        return this.burger;
    }
}

// Director 
export class BurgerDirector {
    private builder: BurgerBuilder;

    constructor(builder: BurgerBuilder) {
        this.builder = builder;
    }

    public constructBurger(): Burger {
        return this.builder.addBuns("Whole wheat").addPatty("Beef").addCheese("Cheddar").build();
    }
}