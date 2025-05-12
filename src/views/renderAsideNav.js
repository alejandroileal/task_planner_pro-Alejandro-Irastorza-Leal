import { app } from "../app.js";
import { asideMenu } from "../components/asideMenu.js";
import { eventsSlice } from "../state/eventsSlice.js";
import { tasksSlice } from "../state/tasksSlice.js";
import { userSlice } from "../state/usersSlice.js";

export function renderAsideNav() {
  app.elements.asideNav.element.innerHTML = asideMenu(
    userSlice.user.role,
    userSlice.user.firstName,
    userSlice.user.lastName
  );

  const newTaskBtn = document.querySelector("#newTaskBtn");
  const newEventBtn = document.querySelector("#newEventBtn");

  newTaskBtn.addEventListener("click", (e) => {
    if (tasksSlice.currentTask) tasksSlice.cleanCurrentTask();
  });

  newEventBtn.addEventListener("click", (e) => {
    if (eventsSlice.currentEvent) eventsSlice.cleanCurrentEvent();
  });
}
