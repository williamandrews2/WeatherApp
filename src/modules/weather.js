import ui from "./ui";

let todaysWeather; // testing variable
let days = 5; // amount of days to get the future weather for (between 0 and 14)
let futureWeather = [];

class WeatherData {
  constructor(
    city,
    date,
    temperature,
    condition,
    icon,
    tempMax,
    tempMin,
    description
  ) {
    this.city = city;
    this.date = date;
    this.temperature = temperature;
    this.condition = condition;
    this.icon = icon;
    this.tempMax = tempMax;
    this.tempMin = tempMin;
    this.description = description;
  }
}

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=6TYEE487MLZ845HXHLDM9VE7C`
    );
    const weatherData = await response.json();
    getTodaysWeather(weatherData);
    getFutureWeather(weatherData);
    ui.renderWeather(); // render as soon as the API call is complete.
  } catch (e) {
    console.log(
      `Error retrieving weather data for the city of ${city}. ERROR: ${e}`
    );
  }
}

function getTodaysWeather(data) {
  // setting today's weather for testing
  todaysWeather = new WeatherData(
    data.resolvedAddress,
    data.days[0].datetime,
    Math.round(data.currentConditions.temp),
    data.currentConditions.conditions,
    data.currentConditions.icon,
    Math.round(data.days[0].tempmax),
    Math.round(data.days[0].tempmin),
    data.description
  );
}

function getFutureWeather(data) {
  futureWeather = []; // reset array completely
  for (let i = 1; i <= days; i++) {
    let futureWeatherObj = new WeatherData(
      data.resolvedAddress,
      data.days[i].datetime,
      Math.round(data.days[i].temp),
      data.days[i].conditions,
      data.days[i].icon,
      Math.round(data.days[i].tempmax),
      Math.round(data.days[i].tempmin),
      data.days[i].description
    );
    futureWeather.push(futureWeatherObj);
  }
}

export { getWeather, todaysWeather, futureWeather, days };
