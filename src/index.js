import "./styles.css";
import { getWeather } from "./modules/weather";
import moon from "./images/moon.svg";

const form = document.querySelector("form");
const city = document.getElementById("searchbox");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  city.blur();
  localStorage.setItem("city", city.value);
  getWeather(city.value);
});

function loadUserPrefs() {
  loadTheme();
  loadRecentCity();
}

function loadRecentCity() {
  const recentCity = localStorage.getItem("city");
  if (recentCity) {
    getWeather(recentCity);
  } else {
    getWeather("San Francisco");
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  const themeIcon = document.getElementById("theme-icon");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
    themeIcon.src = moon;
  }
}

window.onload = loadUserPrefs;
