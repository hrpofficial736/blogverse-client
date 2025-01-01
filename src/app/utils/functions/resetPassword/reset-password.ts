import { api } from "@/app/axios/api-fetch-function";

export default async function resetPassword(
  username: string,
  oldPassword: string,
  newPassword: string,
): Promise<boolean> {
  try {
    await api.put(`/resetPassword/${encodeURIComponent(username)}`, {
      oldPassword,
      newPassword,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
