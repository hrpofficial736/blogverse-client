import React from "react";
import { RegisterForm } from "@/app/forms/RegisterForm";
import { toggleLoaderHandler } from "@/app/forms/LoginForm";

const Register: React.FC<toggleLoaderHandler> = ({
  toggleLoader,
}: {
  toggleLoader: () => void;
}) => {
  return (
    <main
      className="w-[90%] mx-auto flex flex-col gap-y-5 items-center
      bg-white lg:w-[30%] lg:h-[75%] rounded-3xl shadow-2xl shadow-primary p-4 lg:p-0"
    >
      <h1 className="text-center text-black text-2xl lg:mt-5 font-bold font-sans">
        Create an account
      </h1>
      <RegisterForm toggleLoader={toggleLoader} />
    </main>
  );
};

export default Register;
