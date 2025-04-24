import "./styles.css";
import { getWeather } from "./modules/weather";
import ui from "./modules/ui";

const form = document.querySelector("form");
const city = document.getElementById("searchbox");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(city.value);
});
