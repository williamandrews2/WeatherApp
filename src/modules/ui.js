import { todaysWeather, futureWeather, days } from "./weather";
import moon from "../images/moon.svg";
import sun from "../images/sun.svg";

// this creates a context of all images in the folder
const weatherIcons = require.context(
  "../weathericons",
  false,
  /\.(png|jpe?g|svg)$/
);

const weatherContainer = document.querySelector(".weather-container");
const themeIcon = document.getElementById("theme-icon");
const toggleButton = document.getElementById("theme-toggle");
toggleButton.addEventListener("click", toggleTheme);

let isDay = true;

function renderWeather() {
  weatherContainer.innerHTML = "";
  renderTodaysWeather();
  renderFutureWeather();
}

function renderTodaysWeather() {
  const mainSectionContainer = document.createElement("div");
  mainSectionContainer.className = "main-section-container";

  const todayHeading = document.createElement("h2");
  todayHeading.className = "section-heading";
  todayHeading.textContent = `Current conditions for ${todaysWeather.city}`;

  const todaySection = document.createElement("div");
  todaySection.className = "today-section";

  const todayLeft = document.createElement("div");
  todayLeft.className = "today-item today-left";
  const img = document.createElement("img");
  img.src = getIconPath(todaysWeather.icon);

  const desc = document.createElement("h2");
  desc.className = "today-item today-description";
  desc.textContent = todaysWeather.description;

  todayLeft.append(img, desc);

  const todayRight = document.createElement("div");
  todayRight.className = "today-item today-right";

  const temp = document.createElement("h2");
  temp.className = "today-item today-temp";
  temp.textContent = `${todaysWeather.temperature}°`;

  const condition = document.createElement("h2");
  condition.className = "today-item today-condition";
  condition.textContent = todaysWeather.condition;

  const tempRange = document.createElement("div");
  tempRange.className = "today-item today-range";
  const feelsLike = document.createElement("h2");
  feelsLike.textContent = `Feels like: ${todaysWeather.feelsLike}°`;
  const range = document.createElement("h2");
  range.textContent = `High: ${todaysWeather.tempMax}° Low: ${todaysWeather.tempMin}°`;
  tempRange.append(feelsLike, range);

  todayRight.append(temp, condition, tempRange);

  todaySection.append(todayLeft, todayRight);

  mainSectionContainer.appendChild(todayHeading);
  mainSectionContainer.appendChild(todaySection);
  weatherContainer.appendChild(mainSectionContainer);
}

function renderFutureWeather() {
  const mainSectionContainer = document.createElement("div");
  mainSectionContainer.className = "main-section-container";

  const futureHeading = document.createElement("h2");
  futureHeading.className = "section-heading";
  futureHeading.textContent = `${days}-day Forecast`;

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
    date.textContent = getDayOfWeek(day.date);

    const temps = document.createElement("div");
    temps.className = "future-temps";
    temps.textContent = `H: ${day.tempMax}° L: ${day.tempMin}°`;

    futureItem.append(date, img, temps);

    futureSection.appendChild(futureItem);
  });
  mainSectionContainer.appendChild(futureHeading);
  mainSectionContainer.appendChild(futureSection);
  weatherContainer.appendChild(mainSectionContainer);
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

function getDayOfWeek(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

function toggleTheme() {
  const root = document.documentElement;
  root.classList.toggle("dark");
  isDay = !isDay;
  themeIcon.src = isDay ? sun : moon;
}

export default { renderWeather };
