import "./styles.css";
import { getWeather } from "./modules/weather";
import ui from "./modules/ui";

const form = document.querySelector("form");
const city = document.getElementById("searchbox");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(city.value);
  // Temporary band aid to wait on API call to finish. Likely a better
  // idea to add ui render function to the async function getWeather.
  setTimeout(ui.renderWeather, 1000);
});
