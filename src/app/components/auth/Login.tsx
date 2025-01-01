import React from "react";
import { LoginForm } from "@/app/forms/LoginForm";
import { toggleLoaderHandler } from "@/app/forms/LoginForm";

const Login: React.FC<toggleLoaderHandler> = ({
  toggleLoader,
}: {
  toggleLoader: () => void;
}) => {
  return (
    <main
      className="w-[90%] max-w-[550px] mx-auto flex flex-col gap-y-5 items-center
      bg-white lg:w-[30%] lg:h-[70%] rounded-3xl shadow-2xl shadow-primary p-4 lg:p-0"
    >
      <h1 className="text-center text-black text-2xl lg:mt-5 font-bold font-sans">
        Sign in
      </h1>
      <LoginForm toggleLoader={toggleLoader} />
    </main>
  );
};

export default Login;
