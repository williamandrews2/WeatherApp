import "./styles.css";
import { getWeather } from "./modules/weather";
import ui from "./modules/ui";

const form = document.querySelector("form");
const city = document.getElementById("searchbox");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  city.blur();
  localStorage.setItem("city", city.value);
  getWeather(city.value);
});

function loadRecentCity() {
  const recentCity = localStorage.getItem("city");
  if (recentCity) {
    getWeather(recentCity);
  } else {
    getWeather("San Francisco");
  }
}

window.onload = loadRecentCity;
