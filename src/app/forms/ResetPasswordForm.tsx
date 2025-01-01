import React, { useEffect, useState } from "react";
import fetchMyData from "../utils/functions/sidebar/fetchMyData";
import { useParams } from "next/navigation";
import { fetchMyDataResponse } from "../interfaces/responses/fetchMyDataResponse";
import resetPassword from "../utils/functions/resetPassword/reset-password";

export const ResetPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const { username }: { username: string } = useParams<{ username: string }>();
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    const fetchEmail = async () => {
      const response: fetchMyDataResponse = await fetchMyData(username);
      setEmail(response.data!.email);
    };
    fetchEmail();
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent,
    username: string,
    formData: { oldPassword: string; newPassword: string },
  ) => {
    e.preventDefault();
    const passwordUpdateResponse: boolean = await resetPassword(
      username,
      formData.oldPassword,
      formData.newPassword,
    );
    if (passwordUpdateResponse) {
      formData.oldPassword = "";
      formData.newPassword = "";
      alert("Your password has been updated!");
    }
  };
  return (
    <main className="max-lg:mt-4 max-lg:w-full w-[600px] h-[400px] px-4 py-2 bg-white rounded-3xl border-4 border-primary">
      <h1 className="text-center max-lg:text-xl text-2xl font-bold">
        Reset Password
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e, username, formData)}
        className="lg:m-5 max-lg:mt-2 lg:px-10 max-lg:w-full flex flex-col gap-y-5 h-[90%]"
      >
        <div className="flex flex-col">
          <label className="font-bold">Email</label>
          <input
            type="text"
            value={email}
            placeholder="Fetching your email..."
            disabled
            className="lg:min-w-[300px] border border-black rounded-3xl p-2 text-black"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Old Password</label>
          <input
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            type="password"
            required
            className="lg:min-w-[300px] border border-black rounded-3xl p-2 text-black"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="lg:min-w-[300px] border border-black rounded-3xl p-2 text-black"
          />
        </div>
        <button
          className="bg-primary font-[Nunito] rounded-3xl text-white
              font-bold w-48 h-11 mx-auto mt-2
              hover:bg-white hover:text-black hover:border-2 hover:border-black hover:transition-all hover:duration-150
              "
        >
          Submit
        </button>
      </form>
    </main>
  );
};
