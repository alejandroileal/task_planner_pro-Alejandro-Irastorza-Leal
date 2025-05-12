import { app } from "../app.js";
import { eventsSlice } from "../state/eventsSlice.js";
import { formatDate } from "../utils/formatDate.js";

export function createEventElement(event) {
  const li = document.createElement("li");
  li.classList.add("event-card__list-container");
  li.id = event._id;
  li.innerHTML = `
    <div class="event__weather-img" style="background-image: url(https://openweathermap.org/img/wn/${
      event.weatherData?.icon
    }@2x.png)"></div>
    <div class="event__info-container">
      <h3 class="event__title">${event.title}</h3>
      <div class="event__time-and-date">
        <p class="event__date">${formatDate(event.date)} <span>|</span></p>
        <p class="event__time">${event.time}</p>
      </div>
      ${
        event.weatherData
          ? `
        <div class="event__weather-data">
          <p class="event__min">Min ${event.weatherData.temp_min} °C</p>
          <p class="event__max">Max ${event.weatherData.temp_max} °C</p>
        </div>`
          : ""
      }
    </div>`;

  li.addEventListener("click", () => {
    eventsSlice.currentEvent = eventsSlice.events.find((e) => e._id === li.id);
    app.navigate("newEvent");
  });

  return li;
}
