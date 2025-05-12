import { app } from "../app.js";
import { mobileNav } from "../components/mobileNav.js";
import { userSlice } from "../state/usersSlice.js";

export function renderMobileNav() {
  app.elements.main.element.innerHTML = mobileNav(
    userSlice.user.firstName,
    userSlice.user.lastName,
    userSlice.user.role
  );
}
