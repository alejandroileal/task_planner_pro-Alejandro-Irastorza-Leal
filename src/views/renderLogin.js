import { app } from "../app.js";
import { loginSection } from "../components/login.js";
import { userSlice } from "../state/usersSlice.js";
import { getFormData } from "../utils/getFormData.js";

export function renderLogin() {
  app.elements.asideNav.element.classList.add("hide");
  app.elements.main.element.innerHTML = loginSection();

  const loginForm = document.querySelector("#loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const loginData = getFormData(e.target);
    console.log(loginData);
    await userSlice.loginUser(loginData);
  });
}
