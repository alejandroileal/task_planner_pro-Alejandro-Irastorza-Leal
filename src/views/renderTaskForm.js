import { app } from "../app.js";
import { imgAdminListItem } from "../components/imgAdminListItem.js";
import { taskForm } from "../components/taskFrom.js";
import { tasksSlice } from "../state/tasksSlice.js";
import { htmlActions } from "../utils/htmlActions.js";

export function renderTaskForm() {
  const isEdit = tasksSlice.currentTask !== null;

  app.elements.main.element.innerHTML = taskForm(isEdit);

  const form = document.querySelector("#addTaskForm");
  const cancelBtn = document.querySelector("#taskCancelBtn");
  const backBtn = document.querySelector("#taskBackBtn");
  const deleteBtn = document.querySelector("#taskDeleteBtn");
  const imagesContainer = htmlActions.getById("imagesContainer");

  if (isEdit) {
    const current = tasksSlice.currentTask;

    Array.from(form.elements).forEach((input) => {
      if (
        input instanceof HTMLButtonElement ||
        !input.name ||
        input.name === "images"
      )
        return;

      let value = current[input.name];

      if (input.type === "date" && value) {
        value = new Date(value).toISOString().split("T")[0];
      }

      input.value = value || "";
    });

    current.images?.forEach((imageData) => {
      imagesContainer.innerHTML += imgAdminListItem(imageData);
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    if (isEdit) {
      tasksSlice.updateTask(formData, this);
    } else {
      tasksSlice.createTask(formData);
    }
  });

  cancelBtn.addEventListener("click", () => {
    tasksSlice.currentTask = null;
    app.navigate("dashboard");
  });

  backBtn.addEventListener("click", () => {
    app.navigate("nav");
  });

  if (isEdit && deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      tasksSlice.deleteTask(tasksSlice.currentTask._id);
    });
  }
}
