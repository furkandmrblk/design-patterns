interface Item {
    id: string;
    name: string;
    price: number;
}

interface Menu {
    items: Item[];
}

interface Hotel {
    getMenu(): Menu;
}

// Restaurants (System)
class VegetarianRestaurant implements Hotel {
    getMenu(): Menu {
        return  new VegetarianMenu();
    }
}

class VegannRestaurant implements Hotel {
    getMenu(): Menu {
        return  new VeganMenu();
    }
}


class NormalRestaurant implements Hotel {
    getMenu(): Menu {
        return  new NormalMenu();
    }
}


// Menus (System)
class VegetarianMenu implements Menu {
    items: Item[];

    constructor() {
        this.items = [
            { id: "veg-1", name: "Margherita Pizza", price: 8.99 },
            { id: "veg-2", name: "Vegetable Lasagna", price: 12.49 },
            { id: "veg-3", name: "Grilled Halloumi Salad", price: 9.99 }
        ]
    }
}

class VeganMenu implements Menu {
    items: Item[];

    constructor() {
        this.items = [
            { id: "vegan-1", name: "Vegan Burger", price: 10.99 },
            { id: "vegan-2", name: "Quinoa Buddha Bowl", price: 11.49 },
            { id: "vegan-3", name: "Vegan Chocolate Cake", price: 6.99 }
        ]
    }
}

class NormalMenu implements Menu {
    items: Item[];

    constructor() {
        this.items = [
            { id: "norm-1", name: "Cheeseburger", price: 9.99 },
            { id: "norm-2", name: "Spaghetti Carbonara", price: 13.49 },
            { id: "norm-3", name: "Grilled Chicken Caesar Salad", price: 11.99 }
        ]
    }
}

// Hotelkeeper (Facade)

interface HotelKeeper {
    getVegetarianMenu(): Menu;
    getVeganMenu(): Menu;
    getNormalMenu(): Menu;
}

export class HotelKeeperImplementation implements HotelKeeper {
    constructor() {}

    getNormalMenu(): Menu {
        const restaurant = new NormalRestaurant();
        return restaurant.getMenu();
    }

    getVegetarianMenu(): Menu {
        const restaurant = new VegetarianRestaurant();
        return restaurant.getMenu();
    }

    getVeganMenu(): Menu {
        const restaurant = new VegannRestaurant();
        return restaurant.getMenu();
    }
}