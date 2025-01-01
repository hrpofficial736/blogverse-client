import axios from "axios";
import { tokenAtom } from "../recoil/tokenState";
import { getRecoil } from "recoil-nexus";
import { refreshAccessToken } from "../utils/tokens/refreshAccessToken";

export const api = axios.create({
  baseURL: `/api`,
});

api.interceptors.request.use(
  (config) => {
    const token = getRecoil(tokenAtom);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api.request(error.config);
      }
    }
    return Promise.reject(error);
  },
);
