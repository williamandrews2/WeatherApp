let todaysWeather; // testing variable
let days = 5; // amount of days to get the future weather for (between 0 and 14)
let futureWeather = [];

class WeatherData {
  constructor(date, temperature, condition, icon) {
    this.date = date;
    this.temperature = temperature;
    this.condition = condition;
    this.icon = icon;
  }
}

class FutureWeatherData extends WeatherData {
  constructor(date, temperature, condition, icon, tempMax, tempMin) {
    super(date, temperature, condition, icon);
    this.tempMax = tempMax;
    this.tempMin = tempMin;
  }
}

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=6TYEE487MLZ845HXHLDM9VE7C`
    );
    const weatherData = await response.json();
    // getTodaysWeather(weatherData);
    getFutureWeather(weatherData);
    console.log(futureWeather);
    // console.log(todaysWeather);
    console.log(weatherData);
  } catch (e) {
    console.log(
      `Error retrieving weather data for the city of ${city}. ERROR: ${e}`
    );
  }
}

function getTodaysWeather(data) {
  // setting today's weather for testing
  todaysWeather = new WeatherData(
    data.days[0].datetime,
    data.currentConditions.temp,
    data.currentConditions.conditions,
    data.currentConditions.icon
  );
}

function getFutureWeather(data) {
  for (let i = 1; i <= days; i++) {
    let futureWeatherObj = new FutureWeatherData(
      data.days[i].datetime,
      data.days[i].temp,
      data.days[i].conditions,
      data.days[i].icon,
      data.days[i].tempmax,
      data.days[i].tempmin
    );
    futureWeather.push(futureWeatherObj);
  }
}

export default {
  getWeather,
};
