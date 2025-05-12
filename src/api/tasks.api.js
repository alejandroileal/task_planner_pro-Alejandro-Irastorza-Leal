import { SERVER_URL } from "../config.js";

export const tasksRepo = {
  async getTasks() {
    try {
      const result = await fetch(`${SERVER_URL}/tasks`, {
        credentials: "include",
      });
      return await result.json();
    } catch (error) {
      htmlActions.showSimpleDialog(error.message);
    }
  },
  async createTask(formData) {
    try {
      const url = `${SERVER_URL}/tasks/create`;
      const result = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      return await result.json();
    } catch (error) {
      htmlActions.showSimpleDialog(error.message);
    }
  },

  async updateTask(taskId, fromData) {
    try {
      const url = `${SERVER_URL}/tasks/update/${taskId}`;
      const result = await fetch(url, {
        method: "PATCH",
        body: fromData,
        credentials: "include",
      });
      return await result.json();
    } catch (error) {
      htmlActions.showSimpleDialog(error.message);
    }
  },

  async deleteTask(taskId) {
    try {
      const url = `${SERVER_URL}/tasks/delete/${taskId}`;
      const result = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      return await result.json();
    } catch (error) {
      htmlActions.showSimpleDialog(error.message);
    }
  },

  async filterTask(status) {
    try {
      const url = `${SERVER_URL}/tasks/filter/${status}`;
      const result = await fetch(url, {
        method: "GET",
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
};
