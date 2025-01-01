import React, { ChangeEvent, MutableRefObject, useRef, useState } from "react";
import { CompleteYourProfileFormInterface } from "../interfaces/forms/complete-profile-form";
import { CountryDropDown } from "@/app/exports/components/profile/exports";
import { submitProfileForm } from "../utils/functions/profile-form/submitProfileForm";
import { FaPlusCircle, FaUserCircle } from "react-icons/fa";
import { toggleLoaderHandler } from "@/app/forms/LoginForm";
import { useParams, useRouter } from "next/navigation";

export const CompleteYourProfileForm: React.FC<toggleLoaderHandler> = ({
  toggleLoader,
}: {
  toggleLoader: () => void;
}) => {
  const router = useRouter();
  const { username }: { username: string } = useParams<{ username: string }>();
  const [userProfilePhoto, setUserProfilePhoto] = useState(
    <>
      <FaUserCircle
        size={20}
        className="text-black w-full h-full bg-white rounded-full"
      />
      <FaPlusCircle
        size={20}
        className="text-primary absolute top-0 right-2 bg-white rounded-full"
      />
    </>,
  );
  const [formData, setFormData] = useState<CompleteYourProfileFormInterface>({
    image: undefined,
    profession: "",
    description: "",
    country: "",
  });

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const triggerImageInput = () => {
    inputRef.current?.click();
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
          className="rounded-full border-2 border-primary"
        />,
      );
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCountryChange = (country: string) => {
    setFormData((prevData) => ({
      ...prevData,
      country: country,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent,
    formData: CompleteYourProfileFormInterface,
  ) => {
    e.preventDefault();
    toggleLoader();
    const isFormSubmittedResponse = await submitProfileForm(
      e,
      formData,
      username,
    );
    if (isFormSubmittedResponse) {
      toggleLoader();
      router.push(`/${username}/dashboard`);
    }
  };
  return (
    <main className="w-[90%] h-[80%] m-4">
      <div
        onClick={triggerImageInput}
        className="w-14 h-14 lg:w-20 lg:h-20 mx-auto bg-zinc-900 rounded-full relative"
      >
        {typeof userProfilePhoto != undefined || null ? (
          userProfilePhoto
        ) : (
          <>
            <FaUserCircle
              size={20}
              className="text-black w-full h-full bg-white rounded-full"
            />
            <FaPlusCircle
              size={20}
              className="text-primary absolute top-0 right-2 bg-white rounded-full"
            />
          </>
        )}
      </div>
      <form
        className="mx-auto mt-5 flex flex-col"
        onSubmit={(e) => handleSubmit(e, formData)}
      >
        <input
          className="hidden"
          required={true}
          type="file"
          alt={"Profile photo of User"}
          accept={"image/*"}
          onChange={handleChange}
          name={"image"}
          ref={inputRef}
        />
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col">
            <label className="font-sans font-bold">Profession</label>
            <input
              name="profession"
              className="rounded-md border border-black bg-zinc-100 w-full px-2 py-1"
              placeholder="Profession"
              value={formData?.profession}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-sans font-bold">Country</label>
            <CountryDropDown
              selectedCountry={formData.country}
              onChange={handleCountryChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-sans font-bold">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              className="w-full text-sm border border-black rounded-md bg-zinc-100 p-2 h-16 resize-none"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <button
          className="bg-primary font-[Nunito] rounded-3xl text-white
          font-bold w-48 h-11 mx-auto mt-10
          hover:bg-white hover:text-black hover:border-2 hover:border-black hover:transition-all hover:duration-150
          "
        >
          Submit
        </button>
      </form>
    </main>
  );
};
