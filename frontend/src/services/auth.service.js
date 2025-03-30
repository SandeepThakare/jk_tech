import api from "./api";

export const authService = {
  async login(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    localStorage.setItem("token", data.token);
    return data;
  },

  async signup(credentials) {
    const { data } = await api.post("/auth/register", credentials);
    return data;
  },

  logout() {
    localStorage.removeItem("token");
  },

  async getCurrentUser() {
    try {
      const { data } = await api.get("/auth/me");
      return data;
    } catch (error) {
      return null;
    }
  }
}; 