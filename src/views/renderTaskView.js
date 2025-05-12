import { app } from "../app.js";
import { imgListItem } from "../components/imgListItem.js";
import { taskView } from "../components/taskView.js";
import { tasksSlice } from "../state/tasksSlice.js";

export function renderTaskView() {
  const task = tasksSlice.currentTask;

  if (!task) {
    app.navigate("dashboard");
    return;
  }

  app.elements.main.element.innerHTML = taskView(task);

  const backBtn = document.querySelector("#taskBackBtn");
  const imgList = document.querySelector("#taskImgList");

  imgList.innerHTML = "";

  if (Array.isArray(task.images) && task.images.length > 0) {
    task.images.forEach((imgPath) => {
      imgList.insertAdjacentHTML("beforeend", imgListItem(imgPath));

      const lastImgItem = imgList.lastElementChild;

      if (lastImgItem) {
        lastImgItem.addEventListener("click", () => {
          tasksSlice.currentImg = imgPath;
          app.elements.modalImg.element.src = `http://localhost:3500${imgPath}`;
          app.elements.modal.element.classList.remove("hide");
        });
      }
    });
  }

  backBtn.addEventListener("click", () => {
    app.navigate("nav");
  });
}
