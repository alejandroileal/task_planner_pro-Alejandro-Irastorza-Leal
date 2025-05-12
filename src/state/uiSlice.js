import { app } from "../app.js";
import { htmlActions } from "../utils/htmlActions.js";

export const uiSlice = {
  error: null,
  loading: false,

  setError(message) {
    this.error = message;
    htmlActions.showSimpleDialog(message);
  },
  clearError() {
    this.error = null;
  },
  loadingOn() {
    this.loading = true;
    app.elements.loadingPage.element.classList.remove("hide");
  },
  loadingOff() {
    this.loading = false;
    app.elements.loadingPage.element.classList.add("hide");
  },
};
