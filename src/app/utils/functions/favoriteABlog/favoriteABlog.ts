import { api } from "@/app/axios/api-fetch-function";

export default async function favoriteABlog(
  username: string,
  blogId: number | string,
): Promise<boolean> {
  try {
    await api.put("/favoriteABlog", {
      username: username,
      blogId: blogId,
    });
    console.log("Blog favorited by you!");
    return true;
  } catch (error) {
    console.log("Error occured! : ", error);
    return false;
  }
}
