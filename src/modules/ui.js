import { todaysWeather, futureWeather, days } from "./weather";

// this creates a context of all images in the folder
const weatherIcons = require.context(
  "../weathericons",
  false,
  /\.(png|jpe?g|svg)$/
);
const weatherContainer = document.querySelector(".weather-container");

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

  const imgContainer = document.createElement("div");
  imgContainer.className = "today-item today-top-left";
  const img = document.createElement("img");
  img.src = getIconPath(todaysWeather.icon);
  imgContainer.appendChild(img);

  const condition = document.createElement("h2");
  condition.className = "today-item today-bottom-left";
  condition.textContent = todaysWeather.condition;

  const temp = document.createElement("h2");
  temp.className = "today-item today-top-right";
  temp.textContent = `${todaysWeather.temperature}°`;

  const tempRange = document.createElement("div");
  tempRange.className = "today-item today-bottom-right";
  const feelsLike = document.createElement("h2");
  feelsLike.textContent = `Feels like: ${todaysWeather.feelsLike}°`;
  const range = document.createElement("h2");
  range.textContent = `High: ${todaysWeather.tempMax}° Low: ${todaysWeather.tempMin}°`;
  tempRange.append(feelsLike, range);

  todaySection.append(imgContainer, temp, condition, tempRange);

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

export default { renderWeather };
