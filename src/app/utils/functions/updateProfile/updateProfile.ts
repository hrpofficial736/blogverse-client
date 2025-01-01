import { api } from "@/app/axios/api-fetch-function";
import { UpdateProfileFormInterface } from "@/app/interfaces/forms/update-profile-form";

export default async function updateProfile(
  formData: UpdateProfileFormInterface,
  username: string,
): Promise<boolean> {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name!);
    formDataToSend.append("image", formData.image!);
    formDataToSend.append("profession", formData.profession);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("country", formData.country);
    await api.put(
      `/updateProfile/${encodeURIComponent(username)}/profilePhoto`,
      formDataToSend,
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
