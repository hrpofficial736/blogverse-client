import { api } from "@/app/axios/api-fetch-function";
import { BlogInterface } from "@/app/interfaces/forms/blog-interface";

export default async function submitBlogForm(
  blogFormData: BlogInterface,
  username: string,
): Promise<boolean> {
  const formData = new FormData();
  formData.append("title", blogFormData.title);
  formData.append("category", blogFormData.category);
  if (blogFormData.coverImage) {
    console.log("ha hai image to");
    formData.append("coverImage", blogFormData.coverImage);
  }
  formData.append("blogDescription", blogFormData.blogDescription);
  try {
    await api.post(`/add-blog/${username}/blogImage`, formData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
