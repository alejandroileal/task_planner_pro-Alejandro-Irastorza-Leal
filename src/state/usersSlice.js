import { usersRepo } from "../api/users.api.js";
import { app } from "../app.js";
import { htmlActions } from "../utils/htmlActions.js";
import { setupWebSocket } from "../utils/websocket.js";
import { withLoading } from "../utils/withLoading.js";
import { uiSlice } from "./uiSlice.js";

export const userSlice = {
  token: null,
  user: null,
  async loginUser(loginData) {
    const loginResponse = await withLoading(() => usersRepo.login(loginData));

    if (loginResponse.success === "ok") {
      this.token = loginResponse.loginData.token;
      this.user = loginResponse.loginData.user;
      setupWebSocket(this.user._id);
      app.navigate("dashboard");
    }

    if (loginResponse.success === "nok") {
      uiSlice.setError(loginResponse.error);
    }
  },
  async registerUser(newUser) {
    const registerResponse = await withLoading(() =>
      usersRepo.register(newUser)
    );

    if (registerResponse.success === "ok") {
      app.navigate("login");
    }
  },
  async loginWithToken() {
    const loginWithTokenResponse = await withLoading(() =>
      usersRepo.getProfile()
    );

    if (loginWithTokenResponse.success === "ok") {
      this.user = loginWithTokenResponse.user;
      app.navigate("dashboard");
    }
  },
};
