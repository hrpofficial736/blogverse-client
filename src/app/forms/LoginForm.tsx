import React, { useState } from "react";
import Link from "next/link";
import { submitLoginForm } from "../utils/functions/login-form/submit-login-form";
import { LoginUser } from "../interfaces/forms/login-form";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../recoil/tokenState";

export interface toggleLoaderHandler {
  toggleLoader: () => void;
}

export const LoginForm: React.FC<toggleLoaderHandler> = ({
  toggleLoader,
}: {
  toggleLoader: () => void;
}) => {
  const setAccessTokenState = useSetRecoilState(tokenAtom);
  const [formData, setFormData] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent, formData: LoginUser) => {
    toggleLoader();
    const responseFromServer = await submitLoginForm(e, formData);
    if (responseFromServer.authenticated) {
      setAccessTokenState(responseFromServer.data?.token);
      toggleLoader();
      router.push(
        `/${responseFromServer.data?.username}/${responseFromServer.data?.isProfileCompleted ? "dashboard" : "complete-profile"}`,
      );
    } else {
      console.log("nothing from server");
    }
  };
  return (
    <>
      {" "}
      <form
        onSubmit={(e) => handleSubmit(e, formData)}
        className="w-[90%] h-fit md:w-[80%] md:h-[60%] gap-y-10 flex flex-col items-center
      "
      >
        <div className="flex flex-col gap-1 w-full">
          <label className="font-[Nunito] font-bold">Email</label>
          <input
            required
            name="email"
            type="email"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={handleChange}
            className="bg-white rounded-md w-full h-8 px-3 border-2 border-black"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-[Nunito] font-bold">Password</label>
          <input
            required
            name="password"
            type="password"
            placeholder="eg. 12345678"
            value={formData.password}
            onChange={handleChange}
            className="bg-white rounded-md w-full h-8 px-3 border-2 border-black"
          />
        </div>

        <button
          type="submit"
          className="w-40 md:w-[90%] h-11 bg-blue-500 text-white font-sans font-semibold rounded-3xl mx-auto"
        >
          Sign in
        </button>
      </form>
      <p className="font-[Nunito] text-center w-full mt-2 md:m-0">
        New to BlogVerse?
        <Link href={"/register"} className="underline text-primary ml-2">
          Create Account.
        </Link>
      </p>
    </>
  );
};
