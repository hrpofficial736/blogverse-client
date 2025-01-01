import { api } from "@/app/axios/api-fetch-function";

export default async function unfavoriteABlog(
  username: string,
  blogId: number | string,
): Promise<boolean> {
  try {
    await api.put("/unfavoriteABlog", {
      username: username,
      blogId: blogId,
    });
    console.log("Blog unfavorited by you!");
    return true;
  } catch (error) {
    console.log("Error occured! : ", error);
    return false;
  }
}
