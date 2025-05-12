import { app } from "../app.js";
import { taskElement } from "../components/taskElement.js";
import { tasksSlice } from "../state/tasksSlice.js";
import { userSlice } from "../state/usersSlice.js";

export function createTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("task-card__list-item");
  li.id = task._id;
  li.innerHTML = taskElement(task);

  li.addEventListener("click", () => {
    tasksSlice.currentTask = tasksSlice.tasks.find((t) => t._id === li.id);
    app.navigate(userSlice.user.role !== "admin" ? "taskView" : "newTask");
  });

  return li;
}

export function setupTaskFilters(renderDashboard) {
  document.querySelectorAll(".cards__filter-option").forEach((btn) => {
    const text = btn.textContent.toLowerCase();
    if (tasksSlice.filter.toLowerCase() === text) {
      btn.style.backgroundColor = "#9AF0FF";
      btn.style.borderColor = "#9AF0FF";
    }

    btn.addEventListener("click", async () => {
      tasksSlice.filter = btn.textContent;
      text !== "todos"
        ? await tasksSlice.filterTask(btn.textContent)
        : await tasksSlice.loadTasks();

      renderDashboard();
    });
  });
}
