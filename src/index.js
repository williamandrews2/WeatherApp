import "./styles.css";
import weather from "./weather";

const form = document.querySelector("form");
const city = document.getElementById("searchbox");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  weather.getWeather(city.value);
});
