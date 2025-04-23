const form = document.querySelector("form");
const city = document.getElementById("searchbox");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(city.value);
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=6TYEE487MLZ845HXHLDM9VE7C`
    );
    const weatherData = await response.json();
    console.log(weatherData);
  } catch {
    console.log(`Error retrieving weather data for the city of ${city}`);
  }
}
