import { api } from "@/app/axios/api-fetch-function";
import { fetchMyDataResponse } from "@/app/interfaces/responses/fetchMyDataResponse";
import { myDataAtom } from "@/app/recoil/myDataAtom";
import { setRecoil } from "recoil-nexus";

export default async function fetchMyData(
  username: string,
): Promise<fetchMyDataResponse> {
  try {
    const fetchResponse = await api.get(
      `/fetchMyData/${encodeURIComponent(username)}`,
    );
    setRecoil(myDataAtom, {
      image: fetchResponse.data.image,
      name: fetchResponse.data.name,
      username: fetchResponse.data.username,
      email: fetchResponse.data.email,
      profession: fetchResponse.data.profession,
      country: fetchResponse.data.country,
      description: fetchResponse.data.description,
      blogs: fetchResponse.data.blogs,
    });
    return fetchResponse;
  } catch (error) {
    return { error: `Error: ${error}` };
  }
}
