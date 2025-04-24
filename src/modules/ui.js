import { todaysWeather, futureWeather, days } from "./weather";

// this creates a context of all images in the folder
const weatherIcons = require.context(
  "../weathericons",
  false,
  /\.(png|jpe?g|svg)$/
);
const mainContainer = document.querySelector(".main-container");

function renderWeather() {
  renderTodaysWeather();
  renderFutureWeather();
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

function renderFutureWeather() {
  const futureSection = document.createElement("div");
  futureSection.className = "future-section";

  futureWeather.forEach((day) => {
    const futureItem = document.createElement("div");
    futureItem.className = "future-item";

    const img = document.createElement("img");
    img.src = getIconPath(day.icon);
    console.log(img.src);
    img.alt = "Image could not be loaded.";

    const date = document.createElement("div");
    date.className = "future-date";
    date.textContent = day.date;

    const temps = document.createElement("div");
    temps.className = "future-temps";
    temps.textContent = `H: ${day.tempMax} L: ${day.tempMin}`;

    futureItem.append(img, date, temps);

    futureSection.appendChild(futureItem);
  });

  mainContainer.appendChild(futureSection);
}

// helper function to "import" icons due to Webpack
function getIconPath(iconName) {
  try {
    return weatherIcons(`./${iconName}.svg`); // all icons are svg
  } catch (err) {
    console.warn(`Icon for "${iconName}" not found.`, err);
    return weatherIcons("./default.svg"); // fallback icon
  }
}

export default { renderWeather };
