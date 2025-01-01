import React, { useState } from "react";
import Link from "next/link";
import { submitRegisterForm } from "@/app/utils/functions/register-form/submit-register-form";
import { NewUser } from "@/app/interfaces/forms/register-form";
import { useRouter } from "next/navigation";
import { toggleLoaderHandler } from "@/app/forms/LoginForm";

export const RegisterForm: React.FC<toggleLoaderHandler> = ({
  toggleLoader,
}: {
  toggleLoader: () => void;
}) => {
  const [formData, setFormData] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
    cnfPassword: "",
  });
  const router = useRouter();
  const handleRegisterForm = async (e: React.FormEvent, formData: NewUser) => {
    toggleLoader();
    const isRegistered = await submitRegisterForm(e, formData);
    if (isRegistered) {
      toggleLoader();
      router.push("/login");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };
  return (
    <>
      <form
        onSubmit={(e) => handleRegisterForm(e, formData)}
        className="w-[90%] md:w-[80%] gap-y-5 flex flex-col items-center
      "
      >
        <div className="flex flex-col gap-1 w-full">
          <label className="font-[Nunito] font-bold">Name</label>
          <input
            name="name"
            onChange={handleChange}
            required
            type="text"
            placeholder="John Doe"
            className="bg-white rounded-md w-full h-8 px-3 border-2 border-black"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-[Nunito] font-bold">Email</label>
          <input
            name="email"
            onChange={handleChange}
            required
            type="email"
            placeholder="johndoe@example.com"
            className="bg-white rounded-md w-full h-8 px-3 border-2 border-black"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-[Nunito] font-bold">Password</label>
          <input
            name="password"
            onChange={handleChange}
            required
            type="password"
            placeholder="eg. 12345678"
            className="bg-white rounded-md w-full h-8 px-3 border-2 border-black"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-[Nunito] font-bold">Confirm Password</label>
          <input
            onChange={handleChange}
            name="cnfPassword"
            required
            type="password"
            placeholder="eg. 12345678"
            className="bg-white rounded-md w-full h-8 px-3 border-2 border-black"
          />
        </div>

        <button
          type="submit"
          className="w-40 md:w-[90%] mt-4 md:m-0 h-11 bg-blue-500 text-white font-sans font-semibold rounded-3xl mx-auto"
        >
          Sign up
        </button>
      </form>

      <p className="font-[Nunito] text-center w-full mt-1 md:m-2">
        Already have an account?
        <Link href={"/login"} className="underline text-primary ml-2">
          Sign in now.
        </Link>
      </p>
    </>
  );
};
