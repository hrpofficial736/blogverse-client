import { api } from "@/app/axios/api-fetch-function";
import { LoginUser } from "@/app/interfaces/forms/login-form";
import { LoginResponse } from "@/app/interfaces/responses/loginResponse";

export const submitLoginForm = async (
  e: React.FormEvent,
  formData: LoginUser,
): Promise<LoginResponse> => {
  try {
    e.preventDefault();
    const response = await api.post("/login", {
      email: formData.email,
      password: formData.password,
    });
    console.log(response);

    return {
      authenticated: true,
      data: response.data,
    };
  } catch (error) {
    console.log("Error getting authenticated!", error);
    return {
      authenticated: false,
    };
  }
};
