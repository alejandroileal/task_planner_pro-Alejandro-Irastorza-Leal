import { app } from "../app.js";
import { dashboard } from "../components/dashboard.js";
import { eventsSlice } from "../state/eventsSlice.js";
import { tasksSlice } from "../state/tasksSlice.js";
import { userSlice } from "../state/usersSlice.js";
import { createEventElement } from "../ui/eventsUI.js";
import { createTaskElement, setupTaskFilters } from "../ui/tasksUI.js";
import { renderList } from "./renderList.js";

export async function renderDashboard() {
  if (!userSlice.user) return app.navigate("login");

  app.elements.asideNav.element.classList.remove("hide");

  if (!eventsSlice.events || !tasksSlice.tasks) {
    await Promise.all([tasksSlice.loadTasks(), eventsSlice.loadEvents()]);
  }

  const { tasks, events } = { ...tasksSlice, ...eventsSlice };
  const { role } = userSlice.user;

  app.elements.main.element.innerHTML = dashboard(tasks, events, role);

  renderList({
    containerId: app.elements.tasksList.id,
    items: tasks,
    createElement: createTaskElement,
    sortBy: "dueDate",
  });

  renderList({
    containerId: app.elements.eventsList.id,
    items: events,
    createElement: createEventElement,
    sortBy: "date",
  });

  setupTaskFilters(renderDashboard);

  document
    .querySelector("#backBtn")
    ?.addEventListener("click", () => app.navigate("nav"));
}
