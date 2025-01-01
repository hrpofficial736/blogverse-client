import { api } from "@/app/axios/api-fetch-function";
import { tokenAtom } from "@/app/recoil/tokenState";
import { resetRecoil } from "recoil-nexus";

export default async function logOut(): Promise<boolean> {
  try {
    const response = await api.delete("/logOut");
    console.log(response);
    resetRecoil(tokenAtom);
    return true;
  } catch (error) {
    console.log("Error logging out!", error);
    return false;
  }
}
