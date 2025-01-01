import { CompleteYourProfileFormInterface } from "@/app/interfaces/forms/complete-profile-form";
import { api } from "@/app/axios/api-fetch-function";

export async function submitProfileForm(
  e: React.FormEvent,
  formData: CompleteYourProfileFormInterface,
  username: string,
): Promise<object> {
  e.preventDefault();
  const formDataToSend = new FormData();

  formDataToSend.append("image", formData.image!);
  formDataToSend.append("profession", formData.profession);
  formDataToSend.append("description", formData.description);
  formDataToSend.append("country", formData.country);
  try {
    const response = await api.put(
      `/completeProfile/${username}/profilePhoto`,
      formDataToSend,
    );

    return response;
  } catch (error) {
    return { error: error };
  }
}
