import { app } from "../app.js";
import { registerForm } from "../components/registerForm.js";
import { userSlice } from "../state/usersSlice.js";
import { getFormData } from "../utils/getFormData.js";

export function renderRegister() {
  app.elements.asideNav.element.classList.add("hide");
  app.elements.main.element.innerHTML = registerForm();

  const registerFormElement = document.querySelector("#registerForm");

  registerFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    const registerData = getFormData(e.target);
    await userSlice.registerUser(registerData);
  });
}
