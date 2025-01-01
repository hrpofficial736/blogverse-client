import { api } from "@/app/axios/api-fetch-function";

export default async function getFavoriteBlogs(username: string) {
  try {
    const response = await api.get(
      `/getFavoriteBlogs/${encodeURIComponent(username)}`,
    );
    return response.data.favoriteBlogs;
  } catch (error) {
    console.log("Error occured : ", error);
    return false;
  }
}
