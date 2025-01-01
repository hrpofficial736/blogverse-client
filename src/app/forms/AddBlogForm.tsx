import React, { ChangeEvent, MutableRefObject, useRef, useState } from "react";
import { BlogInterface } from "@/app/interfaces/forms/blog-interface";
import submitBlogForm from "../utils/functions/add-blog/submit-blog-form";
import { useParams, useRouter } from "next/navigation";

export const AddBlogForm: React.FC = () => {
  const { username }: { username: string } = useParams<{ username: string }>();
  const router = useRouter();
  const [userProfilePhoto, setUserProfilePhoto] = useState(
    <h4>+ Upload Profile Photo</h4>,
  );
  const [blogFormData, setBlogFormData] = useState<BlogInterface>({
    title: "",
    category: "",
    coverImage: null,
    blogDescription: "",
  });
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const triggerImageInput = () => {
    inputRef.current?.click();
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "coverImage" && e.target instanceof HTMLInputElement) {
      const file: File | undefined = e.target.files?.[0];
      setBlogFormData((prevData) => ({
        ...prevData,
        coverImage: file ? file! : null,
      }));
      setUserProfilePhoto(
        <img
          src={file ? URL.createObjectURL(file) : undefined}
          alt="Click here to upload photo"
          className="border-2 border-primary"
        />,
      );
      return;
    }
    setBlogFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await submitBlogForm(blogFormData, username);
    if (response) {
      router.push(`/${username}/dashboard`);
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={
        "overflow-scroll no-scrollbar max-lg:w-full max-lg:h-full max-lg:p-0 rounded-3xl mx-auto mt-5 flex flex-col justify-center items-center max-lg:gap-y-2 w-11/12"
      }
    >
      <main
        className={
          "w-full max-lg:flex max-lg:w-full max-lg:flex-col max-lg:gap-x-0 max-lg:gap-y-8 grid grid-cols-12 gap-x-20"
        }
      >
        <div className={"max-lg:gap-y-4 col-span-6 flex flex-col gap-y-5"}>
          <div className={"row-span-1 flex flex-col gap-y-2 px-3"}>
            <label className={"text-xl font-bold"}>Title</label>
            <input
              value={blogFormData.title}
              name={"title"}
              onChange={handleChange}
              type={"text"}
              className={
                "border-2 border-black rounded-md px-3 py-2 bg-gray-200"
              }
              placeholder={"Title"}
            />
          </div>

          <div className={" row-span-1 flex flex-col gap-y-2 px-3"}>
            <label className={"text-xl font-bold"}>Category</label>
            <input
              value={blogFormData.category}
              name={"category"}
              onChange={handleChange}
              type={"text"}
              className={
                "border-2 border-black rounded-md px-3 py-2 bg-gray-200"
              }
              placeholder={"Category"}
            />
          </div>

          <div className={"row-span-1 flex flex-col gap-y-2 px-3"}>
            <label className={"text-xl font-bold"}>Upload Image</label>
            <input
              name={"coverImage"}
              onChange={handleChange}
              ref={inputRef}
              type={"file"}
              accept={"image/*"}
              className={"hidden rounded-md px-3 py-2 bg-gray-200"}
              placeholder={"Title"}
            />
            <div
              onClick={triggerImageInput}
              className={
                "w-full min-h-[100px] rounded-lg border-dotted border-2 border-black bg-gray-200 text-zinc-600 flex justify-center cursor-pointer items-center"
              }
            >
              {userProfilePhoto}
            </div>
          </div>
        </div>
        <div className={" col-span-6 row-span-3 flex flex-col gap-y-2 px-3"}>
          <label className={"text-xl font-bold"}>Description</label>
          <textarea
            value={blogFormData.blogDescription}
            name={"blogDescription"}
            onChange={handleChange}
            draggable={"false"}
            className={
              "rounded-md border-2 border-black w-full h-full px-3 py-2 bg-gray-200"
            }
            placeholder={"Blog Description"}
          />
        </div>
      </main>
      <button
        className="bg-primary font-[Nunito] rounded-3xl text-white
            font-bold w-48 h-11 mt-10
            hover:bg-white hover:text-black hover:border-2 hover:border-black hover:transition-all hover:duration-150
            "
      >
        Post
      </button>
    </form>
  );
};
