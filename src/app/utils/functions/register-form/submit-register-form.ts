import { api } from "@/app/axios/api-fetch-function";
import { NewUser  } from "@/app/interfaces/forms/register-form";

export const submitRegisterForm = async(
    e: React.FormEvent,
    formData: NewUser
): Promise<boolean> => {

    try {
        e.preventDefault();
        await api
            .post("/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            })

        console.log("Registered successfully!");
        return true;

    } catch (error) {
        console.log("Error getting authenticated!", error);
    }
    return false;
}
