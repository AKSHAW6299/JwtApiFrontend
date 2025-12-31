import axios from "axios";

const api = axios.create({
  baseURL: "https://jwtapi1111.onrender.com/api",
  withCredentials: true, // refresh token in cookie
});

async function API(config) {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await api(config);
    return response.data;

  } catch (error) {
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;

      try {
        const refreshRes = await api.post("/auth/refresh-token");
        const newToken = refreshRes.data.accessToken;

        localStorage.setItem("token", newToken);
        config.headers.Authorization = `Bearer ${newToken}`;

        return await api(config);
      } catch {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    throw error;
  }
}

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch {}

  localStorage.clear();
  window.location.href = "/login";
};

export { API };
