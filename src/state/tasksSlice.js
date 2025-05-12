import { tasksRepo } from "../api/tasks.api.js";
import { app } from "../app.js";
import { withLoading } from "../utils/withLoading.js";

export const tasksSlice = {
  tasks: null,
  currentTask: null,
  currentImg: null,
  filter: "Todos",
  async loadTasks() {
    const tasksResponse = await withLoading(() => tasksRepo.getTasks());
    this.tasks = tasksResponse.tasks;
  },
  async createTask(formData) {
    const taskCreated = await withLoading(() => tasksRepo.createTask(formData));

    if (taskCreated.success === "ok") {
      await this.loadTasks();
      app.navigate("dashboard");
    }
  },
  async updateTask(formData) {
    const updateTaskResponse = await withLoading(() =>
      tasksRepo.updateTask(this.currentTask._id, formData)
    );

    if (updateTaskResponse.success === "ok") {
      this.currentTask = null;
      await this.loadTasks();
      app.navigate("dashboard");
    }
  },
  async deleteTask(taskId) {
    const deleteTaskResponse = await withLoading(() =>
      tasksRepo.deleteTask(taskId)
    );

    if (deleteTaskResponse.success === "ok") {
      await this.loadTasks();
      app.navigate("dashboard");
    }
  },
  async filterTask(status) {
    const filterTaskResponse = await withLoading(() =>
      tasksRepo.filterTask(status.toLowerCase())
    );

    if (filterTaskResponse.success === "ok") {
      this.tasks = filterTaskResponse.filteredTasks;
    }
  },

  cleanCurrentTask() {
    this.currentTask = null;
  },
};
