import { todaysWeather, futureWeather } from "./weather";

const mainContainer = document.querySelector(".main-container");

function renderWeather() {
  // console.log(mainContainer);
  renderTodaysWeather();
}

function renderTodaysWeather() {
  const todaySection = document.createElement("div");
  todaySection.className = "today-section";

  const city = document.createElement("div");
  city.className = "today-item today-top-left";
  city.textContent = todaysWeather.city;

  const condition = document.createElement("div");
  condition.className = "today-item today-top-right";
  condition.textContent = todaysWeather.condition;

  const temp = document.createElement("div");
  temp.className = "today-item today-bottom-left";
  temp.textContent = todaysWeather.temperature;

  const tempRange = document.createElement("div");
  tempRange.className = "today-item today-bottom-right";
  tempRange.textContent = `High: ${todaysWeather.tempMax} Low: ${todaysWeather.tempMin}`;

  todaySection.append(city, condition, temp, tempRange);

  mainContainer.appendChild(todaySection);
}

export default { renderWeather };
