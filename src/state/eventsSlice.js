import { eventsRepo } from "../api/events.api.js";
import { app } from "../app.js";
import { htmlActions } from "../utils/htmlActions.js";
import { withLoading } from "../utils/withLoading.js";

export const eventsSlice = {
  events: null,
  currentEvent: null,
  currentCity: null,
  async loadEvents() {
    const eventsResponse = await withLoading(() => eventsRepo.getEvents());
    this.events = eventsResponse.events;
  },
  async createEvent(newEvent) {
    let missingValues = [];

    for (let prop in newEvent) {
      if (!newEvent[prop]) {
        missingValues.push(prop);
      }
    }

    if (missingValues.length > 0) {
      htmlActions.showSimpleDialog(
        `Faltan campos obligatorios: ${missingValues.join(", ")}`
      );
    } else {
      const newEventResponse = await withLoading(() =>
        eventsRepo.createEvent(newEvent)
      );

      if (newEventResponse.success === "ok") {
        await this.loadEvents(app);
        app.navigate("dashboard");
      }
    }
  },

  async updateEvent(updatedEvent) {
    const updateEventResponse = await withLoading(() =>
      eventsRepo.updateEvent(this.currentEvent._id, updatedEvent)
    );

    if (updateEventResponse.success === "ok") {
      await this.loadEvents(app);
      app.navigate("dashboard");
    }

    if (updateEventResponse.error) {
      htmlActions.showSimpleDialog(updateEventResponse.error);
    }
  },

  async deleteEvent(eventId) {
    const deleteEventResponse = await withLoading(() =>
      eventsRepo.deleteEvent(eventId)
    );

    if (deleteEventResponse.success === "ok") {
      await this.loadEvents(app);
      app.navigate("dashboard");
    }
  },

  cleanCurrentEvent() {
    this.currentEvent = null;
  },
};
