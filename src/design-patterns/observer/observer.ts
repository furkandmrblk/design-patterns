interface Subject {
    addObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notifyObservers(): void;
}

interface Observer {
    update(weather: string): void;
}

export class WeatherStation implements Subject {
    private observers: Array<Observer> = [];
    private weather: string | undefined;

    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer): void {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }

    notifyObservers(): void {
        if (this.weather) {
            for (const observer of this.observers) {
                observer.update(this.weather);
            }
        }
    }
   
    public setWeather(weather: string): void {
        this.weather = weather;
        this.notifyObservers();
    }
}

export class PhoneDisplay implements Observer {
    private weather!: string;

    update(weather: string): void {
        this.weather = weather;
        this.display();
    }

    display(): void {
        console.log("Phone display: Weather updated - " + this.weather);
    }
}

export class TVDisplay implements Observer {
    private weather!: string;

    update(weather: string): void {
        this.weather = weather;
        this.display();
    }

    display(): void {
        console.log("TV display: Weather updated - " + this.weather);
    }
}