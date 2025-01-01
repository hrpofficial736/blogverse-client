import { api } from "@/app/axios/api-fetch-function";

export default async function fetchOtherUserData(
  username: string,
): Promise<object> {
  try {
    const response = await api.get(`/fetchData/${username}`);
    return response;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}
