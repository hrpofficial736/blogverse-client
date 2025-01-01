import { api } from "@/app/axios/api-fetch-function";

export default async function fetchBlogs(username: string) {
  try {
    const response = await api.get(
      `/fetchBlogs/${encodeURIComponent(username)}`,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}
