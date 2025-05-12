import { formatDate } from "../utils/formatDate.js";

export function taskView(task) {
  return `<section class="dashboard__section" id="taskViewSection">
        <div class="dashboard__top-navigator">
          <div class="dashboard__top-left">
            <p class="dashboard__top-back" id="taskBackBtn">Back</p>
            <div class="dashboard__top-left-page-title">
              <p>✍🏼</p>
              <p>Nueva task</p>
            </div>
          </div>
        </div>

        <header class="new-task__header">
          <p class="dashboard__icon">✍🏼</p>
        </header>

        <div class="dashboard__section-content">
          <div class="dashboard__task-info">
            <p class="dashboard__task-status">${task?.status || "no info"}</p>
            <h2 class="dashboard__task-title">${task?.title || "no info"}</h2>
            <p class="dashboard__task-due-date">${
              formatDate(task?.dueDate) || "no info"
            }</p>

            <p class="dashboard__task-description">${
              task?.description || "no info"
            }</p>

            <ol class="dashboard__img-list" id="taskImgList">
             
            </ol>

          </div>
        </div>
      </section>`;
}
