import React, { useState, useRef, MutableRefObject, ChangeEvent } from "react";
import { CountryDropDown } from "../components/utils/dropdowns/CountryDropDown";
import { UpdateProfileFormInterface } from "../interfaces/forms/update-profile-form";
import { useParams, useRouter } from "next/navigation";
import updateProfile from "../utils/functions/updateProfile/updateProfile";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export const UpdateProfileForm: React.FC = () => {
  const { username }: { username: string } = useParams<{ username: string }>();
  const router = useRouter();
  const [userProfilePhoto, setUserProfilePhoto] = useState(
    <FaUserCircle className="w-10 h-10" />,
  );
  const [formData, setFormData] = useState<UpdateProfileFormInterface>({
    name: "",
    image: undefined,
    profession: "",
    description: "",
    country: "",
  });
  const handleCountryChange = (country: string) => {
    setFormData((prevData) => ({
      ...prevData,
      country: country,
    }));
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "image" && e.target instanceof HTMLInputElement) {
      const file: File | undefined = e.target.files?.[0];
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setUserProfilePhoto(
        <img
          src={file ? URL.createObjectURL(file) : undefined}
          alt="Your uploaded photo"
          className="rounded-full w-10 h-10 border-2 border-primary"
        />,
      );
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const triggerImageInput = () => {
    inputRef.current?.click();
  };
  const handleSubmit = async (
    e: React.FormEvent,
    formData: UpdateProfileFormInterface,
  ) => {
    e.preventDefault();
    const isFormSubmittedResponse = await updateProfile(formData, username);
    if (isFormSubmittedResponse) {
      router.push(`/${username}/dashboard`);
    }
  };
  return (
    <main className="no-scrollbar max-lg:mt-4 max-lg:w-full lg:h-[400px] lg:min-w-[400px] overflow-y-hidden bg-white relative border-4 border-primary rounded-3xl pt-3">
      <h1 className="text-center max-lg:text-xl text-2xl font-bold">
        Update Profile
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e, formData)}
        className="lg:p-5 max-lg:w-[90%] lg:w-[90%] max-lg:flex max-lg:flex-col max-lg:gap-y-2 max-lg:mx-auto max-lg:mb-5 max-lg:mt-2 grid lg:space-x-10 grid-cols-2 grid-rows-3"
      >
        <div className="space-y-5">
          <div className="flex flex-col">
            <label className="font-bold">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="Name"
              className="lg:max-w-[250px] border border-black rounded-3xl p-2 text-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold">Profession</label>
            <input
              type="text"
              required
              name="profession"
              onChange={(e) => handleChange(e)}
              value={formData.profession}
              placeholder="Profession"
              className="lg:max-w-[250px] border border-black rounded-3xl p-2 text-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold">Country</label>
            <CountryDropDown
              selectedCountry={formData.country}
              onChange={handleCountryChange}
            />
          </div>
        </div>
        <div className="space-y-5 col-span-1 max-lg:mt-4">
          <div className="flex flex-col">
            <label className="font-bold">Profile Photo</label>
            <div className="lg:w-fit flex gap-x-5 lg:gap-x-2 items-center">
              <div
                onClick={triggerImageInput}
                className={
                  "px-10 lg:px-5 h-full rounded-lg border-dotted border-2 border-black text-zinc-600 flex gap-x-2 justify-center cursor-pointer items-center py-4"
                }
              >
                <FaCloudUploadAlt size={25} />
                Upload
              </div>
              <div>{userProfilePhoto}</div>
            </div>
            <input
              name={"image"}
              required
              onChange={(e) => handleChange(e)}
              ref={inputRef}
              type={"file"}
              accept={"image/*"}
              className={"hidden"}
              placeholder={"Title"}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold">Description</label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) => handleChange(e)}
              name="description"
              placeholder="Description"
              className="lg:max-w-[250px] border border-black rounded-3xl p-2 text-black"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary font-[Nunito] rounded-3xl text-white
            font-bold w-48 h-11 mx-auto mt-5
            hover:bg-white hover:text-black hover:border-2 hover:border-black hover:transition-all hover:duration-150
            "
        >
          Submit
        </button>
      </form>
    </main>
  );
};
