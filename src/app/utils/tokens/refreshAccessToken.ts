import { setRecoil } from "recoil-nexus";
import { tokenAtom } from "@/app/recoil/tokenState";
import { api } from "@/app/axios/api-fetch-function";

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await api.get(`/refreshToken`, {
      withCredentials: true,
    });
    const newAccessToken = response.data.newAccessToken;
    setRecoil(tokenAtom, newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};
