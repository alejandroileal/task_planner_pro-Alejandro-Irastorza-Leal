import { SERVER_URL } from "../config.js";
import { weatherSlice } from "../state/weatherSlice.js";

export const eventsRepo = {
  async getEvents() {
    try {
      const result = await fetch(`${SERVER_URL}/events`, {
        credentials: "include",
      });
      return await result.json();
    } catch (error) {
      htmlActions.showSimpleDialog(error.message);
    }
  },
  async createEvent(event) {
    try {
      const url = `${SERVER_URL}/events/create`;
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
        credentials: "include",
      });
      return await result.json();
    } catch (error) {
      htmlActions.showSimpleDialog(error.message);
    }
  },

  async updateEvent(eventId, event) {
    try {
      const url = `${SERVER_URL}/events/update/${eventId}`;
      const result = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
        credentials: "include",
      });
      return await result.json();
    } catch (error) {
      htmlActions.showSimpleDialog(error.message);
    }
  },

  async deleteEvent(eventId) {
    try {
      const url = `${SERVER_URL}/events/delete/${eventId}`;
      const result = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      return await result.json();
    } catch (error) {
      htmlActions.showSimpleDialog(error.message);
    }
  },

  async fetchWeather(date) {
    try {
      const eventDate = new Date(date); // Fecha que llega del formulario
      const timestamp = Math.floor(eventDate.getTime() / 1000);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=40.4165&lon=-3.70256&appid=${weatherSlice.openWeatherApiKey}&units=metric&lang=es`
      );

      const { list } = await response.json();

      let closestData = list[0];
      let closestDiff = Math.abs(list[0].dt - timestamp);

      for (const item of list) {
        const diff = Math.abs(item.dt - timestamp);
        if (diff < closestDiff) {
          closestDiff = diff;
          closestData = item;
        }
      }

      return {
        temp: closestData.main.temp,
        temp_min: closestData.main.temp_min,
        temp_max: closestData.main.temp_max,
        description: closestData.weather[0].description,
        icon: closestData.weather[0].icon,
      };
    } catch (error) {
      return null;
    }
  },
};
