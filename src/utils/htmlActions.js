export const htmlActions = {
  getById: (id) => document.getElementById(id),
  refreshElement: (elementId, callback) => {
    const element = htmlActions.getById(elementId);
    element.replaceChildren();
    callback();
  },
  showElement: (elementId) => {
    htmlActions.getById(elementId).style.display = "block";
  },
  customShowElement: (elementId, display) => {
    htmlActions.getById(elementId).style.display = display;
  },
  hideElement: (elementId) => {
    htmlActions.getById(elementId).style.display = "none";
  },
  showSimpleDialog: (text) => {
    alert(text);
  },

  showNotification: (message) => {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.remove("hidden");
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.add("hidden");
      notification.classList.remove("show");
    }, 3000);
  },
};
