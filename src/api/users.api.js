import { SERVER_URL } from "../config.js";

export const usersRepo = {
  async login(loginData) {
    try {
      const url = `${SERVER_URL}/users/login`;
      const loginResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
      return await loginResponse.json();
    } catch (error) {
      htmlActions.showSimpleDialog(error.message);
    }
  },

  async register(registerData) {
    try {
      const url = `${SERVER_URL}/users/register`;
      const registerResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      return await registerResponse.json();
    } catch (error) {
      htmlActions.showSimpleDialog(error.message);
    }
  },

  async getProfile() {
    try {
      const url = `${SERVER_URL}/users/profile`;
      const getProfileResponse = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      return await getProfileResponse.json();
    } catch (error) {}
  },
};
