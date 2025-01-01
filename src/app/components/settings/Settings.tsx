import React, { useState } from "react";
import { UpdateProfileForm } from "@/app/forms/UpdateProfileForm";
import { ResetPasswordForm } from "@/app/forms/ResetPasswordForm";

export const Settings: React.FC = () => {
  const [openUpdateProfileForm, setOpenUpdateProfileForm] = useState(false);

  return (
    <main className="overflow-scroll no-scrollbar row-span-10 mt-5 max-lg:w-full rounded-lg p-5 lg:max-h-[600px] relative">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex max-lg:flex-col max-lg:items-center max-lg:justify-center gap-x-10 lg:px-10 pt-10 relative">
        <div className="flex flex-col gap-y-5">
          <button
            onClick={() => setOpenUpdateProfileForm(true)}
            className={`${openUpdateProfileForm ? "bg-primary text-white" : "bg-zinc-300 text-black"} font-[Nunito] rounded-3xl
            font-bold w-48 h-11
            hover:bg-white hover:text-black hover:border-2 hover:border-black hover:transition-all hover:duration-150
            `}
          >
            Profile Settings
          </button>
          <button
            onClick={() => setOpenUpdateProfileForm(false)}
            className={`${!openUpdateProfileForm ? "bg-primary text-white" : "bg-zinc-300 text-black"} font-[Nunito] rounded-3xl
            font-bold w-48 h-11
            hover:bg-white hover:text-black hover:border-2 hover:border-black hover:transition-all hover:duration-150
            `}
          >
            Account Settings
          </button>
        </div>
        <div className="max-lg:w-[300px] w-[1px] max-lg:h-[1px] h-[400px] bg-gray-500 max-lg:mt-5"></div>
        {openUpdateProfileForm ? <UpdateProfileForm /> : <ResetPasswordForm />}
      </div>
    </main>
  );
};
