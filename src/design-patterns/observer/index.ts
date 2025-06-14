import { PhoneDisplay, TVDisplay, WeatherStation } from "./observer";

function main() {
    const phone = new PhoneDisplay();
    const tv = new TVDisplay();

    const weatherStation = new WeatherStation();

    weatherStation.setWeather("Cloudy (18°C)");
    weatherStation.addObserver(phone);
    weatherStation.notifyObservers();
    weatherStation.addObserver(tv);
    weatherStation.setWeather("Sunny (22°C)");
    weatherStation.removeObserver(tv);
    weatherStation.setWeather("Cloudy and rainy (17°C)");

    return 0;
};

main();

/**
 * Output:
 * Phone display: Weather updated - Cloudy (18°C)
 * Phone display: Weather updated - Sunny (22°C)
 * TV display: Weather updated - Sunny (22°C)
 * Phone display: Weather updated - Cloudy and rainy (17°C)
 * 
 */