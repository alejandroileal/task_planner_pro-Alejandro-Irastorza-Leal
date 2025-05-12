import { formatDate } from "../utils/formatDate.js";

export function taskElement(task) {
  return `
      <div class="task-card__container">
        <p class="task-card__expiration">${formatDate(task.dueDate)}</p>
        <h3 class="task-card__title">${task.title}</h3>
        <p class="task-card__state">${task.status}</p>
      </div>`;
}
