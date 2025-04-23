const form = document.querySelector("form");
const city = document.getElementById("searchbox");

// testing variable
let todaysWeather;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(city.value);
});

class WeatherData {
  constructor(date, temperature, condition, icon) {
    this.date = date;
    this.temperature = temperature;
    this.condition = condition;
    this.icon = icon;
  }
}

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=6TYEE487MLZ845HXHLDM9VE7C`
    );
    const weatherData = await response.json();
    parseWeatherData(weatherData);
    console.log(todaysWeather);
    // console.log(weatherData);
  } catch {
    console.log(`Error retrieving weather data for the city of ${city}`);
  }
}

function parseWeatherData(data) {
  // setting today's weather for testing
  todaysWeather = new WeatherData(
    data.days[0].datetime,
    data.currentConditions.temp,
    data.currentConditions.conditions,
    data.currentConditions.icon
  );
}
