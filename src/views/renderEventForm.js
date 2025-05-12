import { eventsRepo } from "../api/events.api.js";
import { app } from "../app.js";
import { eventForm } from "../components/eventForm.js";
import { eventsSlice } from "../state/eventsSlice.js";
import { getFormData } from "../utils/getFormData.js";

export function renderEventForm() {
  const isEditMode = eventsSlice.currentEvent !== null;

  app.elements.main.element.innerHTML = eventForm(isEditMode);

  const form = document.querySelector("#addEventForm");
  const cancelBtn = document.querySelector("#eventCancelBtn");
  const backBtn = document.querySelector("#eventBackBtn");
  const deleteBtn = document.querySelector("#eventDeleteBtn");

  if (isEditMode) {
    Array.from(form.elements).forEach((input) => {
      if (input instanceof HTMLButtonElement) return;
      input.value = eventsSlice.currentEvent[input.name] || "";
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = getFormData(form);

    const eventData = {
      ...formData,
      weatherData: await eventsRepo.fetchWeather(formData.date),
    };

    isEditMode
      ? eventsSlice.updateEvent(eventData, this)
      : eventsSlice.createEvent(eventData, this);
  });

  cancelBtn.addEventListener("click", () => {
    eventsSlice.currentEvent = null;
    app.navigate("dashboard");
  });

  backBtn.addEventListener("click", () => {
    app.navigate("nav");
  });

  if (isEditMode && deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      eventsSlice.deleteEvent(eventsSlice.currentEvent._id);
    });
  }
}
