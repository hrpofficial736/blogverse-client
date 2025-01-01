import { api } from "@/app/axios/api-fetch-function";
import { OtherUser } from "@/app/interfaces/otherUser/interface";

export default async function fetchUsers(
  input: string,
): Promise<OtherUser[] | null> {
  try {
    const response = await api.get(`/fetchUsers/${encodeURIComponent(input)}`);
    return response.data.users;
  } catch (error) {
    console.log(error);
    return null;
  }
}
