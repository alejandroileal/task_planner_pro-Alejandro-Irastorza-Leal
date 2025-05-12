import { htmlActions } from "./utils/htmlActions.js";
import { tasksSlice } from "./state/tasksSlice.js";
import { eventsSlice } from "./state/eventsSlice.js";
import { userSlice } from "./state/usersSlice.js";
import { setupWebSocket } from "./utils/websocket.js";
import { renderDashboard } from "./views/renderDashboard.js";
import { renderTaskForm } from "./views/renderTaskForm.js";
import { renderAsideNav } from "./views/renderAsideNav.js";
import { renderNews } from "./views/renderNews.js";
import { renderEventForm } from "./views/renderEventForm.js";
import { renderMobileNav } from "./views/renderMobileNav.js";
import { renderLogin } from "./views/renderLogin.js";
import { renderRegister } from "./views/renderRegister.js";
import { renderTaskView } from "./views/renderTaskView.js";

export const app = {
  elements: {
    main: { id: "mainLocator", element: htmlActions.getById("mainLocator") },
    dashboard: { id: "dashboard", element: htmlActions.getById("dashboard") },
    tasksList: {
      id: "tasksList",
      element: htmlActions.getById("tasksList"),
    },
    eventsList: {
      id: "eventsList",
      element: htmlActions.getById("eventsList"),
    },
    addTaskForm: {
      id: "addTaskForm",
      element: htmlActions.getById("addTaskForm"),
    },
    allFilterBtn: {
      id: "allFilter",
    },
    asideNav: {
      id: "aside",
      element: htmlActions.getById("aside"),
    },
    loadingPage: {
      id: "loading",
      element: htmlActions.getById("loading"),
    },
    modal: {
      id: "modal",
      element: htmlActions.getById("modal"),
    },
    modalImg: {
      id: "modalImg",
      element: htmlActions.getById("modalImg"),
    },

    modalCloseBtn: {
      id: "modalCloseBtn",
      element: htmlActions.getById("modalCloseBtn"),
    },
  },
  async init() {
    this.setupEventListeners();
    await userSlice.loginWithToken();
    if (userSlice.user) {
      setupWebSocket(userSlice.user._id);
      await tasksSlice.loadTasks();
      await eventsSlice.loadEvents();
    }
    this.renderRoute();
  },
  setupEventListeners() {
    window.addEventListener("hashchange", () => this.renderRoute());

    this.elements.modalCloseBtn.element.addEventListener("click", () => {
      tasksSlice.currentImg = null;
      this.elements.modal.element.classList.add("hide");
    });
  },
  renderRoute() {
    const currentRoute = location.hash.slice(1) || "dashboard";
    switch (currentRoute) {
      case "dashboard":
        if (userSlice.user) {
          renderAsideNav();
          renderDashboard();
        } else {
          this.navigate("login");
        }
        break;
      case "newTask":
        renderTaskForm();
        break;
      case "news":
        renderNews();
        break;
      case "newEvent":
        renderEventForm();
        break;
      case "nav":
        if (Number(window.outerWidth) < 766) {
          renderMobileNav();
        } else {
          this.navigate("dashboard");
        }
        break;
      case "login":
        renderLogin();
        break;
      case "register":
        renderRegister();
        break;
      case "taskView":
        renderTaskView();
        break;
      default:
        renderDashboard();
        break;
    }
  },
  navigate(route) {
    location = `#${route}`;
  },
};

app.init();
