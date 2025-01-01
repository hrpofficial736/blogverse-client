"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader } from "@/app/components/utils/loader/Loader";
import fetchOtherUserData from "@/app/utils/functions/fetchOtherUserData/fetchOtherUserData";
import { fetchOtherUserDataResponse } from "@/app/interfaces/responses/fetchOtherUserDataResponse";
import { useRecoilValue } from "recoil";
import { showComponentAtom } from "@/app/recoil/showComponentAtom";

interface OtherUserProfileProps {
  callback: (whichOneToUpdate: string) => void;
}

export const OtherUserProfile: React.FC<OtherUserProfileProps> = ({
  callback,
}) => {
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const { username }: { username: "" } = useParams<{ username: "" }>();
  const [userProfileData, setUserProfileData] =
    useState<fetchOtherUserDataResponse>();

  const showComponent = useRecoilValue(showComponentAtom);
  useEffect(() => {
    if (showComponent) setIsFetched(true);
  }, [showComponent]);
  useEffect(() => {
    async function getData() {
      try {
        const result = await fetchOtherUserData(username);
        setUserProfileData(result);
        callback("profileData");
      } catch (error) {
        return error;
      }
    }
    if (username) {
      getData();
    }
  });
  return (
    <>
      {isFetched && (
        <main
          className={"relative max-lg:w-full row-span-10 rounded-3xl px-5 py-3"}
        >
          <div
            className={
              "max-lg:flex max-lg:flex-col max-lg:h-[60%] grid grid-cols-2 grid-rows-3 gap-x-28 gap-y-10 lg:w-3/4 lg:h-3/5 relative lg:mt-20 rounded-3xl mx-auto"
            }
          >
            <div
              className={
                "col-span-1 row-span-3 w-full h-full bg-white border-4 border-primary rounded-3xl"
              }
            >
              <div
                className={
                  "flex flex-col gap-y-2 justify-center items-center mt-6"
                }
              >
                <img
                  alt={"Profile"}
                  className={
                    "max-lg:w-14 max-lg:h-14 w-28 h-28 rounded-full bg-cover bg-white border-4 border-primary"
                  }
                  src={`${process.env.NEXT_PUBLIC_SERVER_URI}${userProfileData?.data?.image}`}
                />
                <h4 className={"text-black font-bold max-lg:text-2xl text-3xl"}>
                  {userProfileData?.data?.name}
                </h4>
                <h5 className={"text-black font-medium lg:text-xl"}>
                  {"( "}
                  {userProfileData?.data?.username}
                  {" )"}
                </h5>
                <div className={"flex flex-col gap-y-2 mt-5"}>
                  <h6
                    className={"text-black font-medium text-xl flex gap-x-16"}
                  >
                    <p className={"font-semibold max-lg:text-base"}>
                      Country:{" "}
                    </p>
                    <p className={"text-lg max-lg:text-base"}>
                      {userProfileData?.data?.country}
                    </p>
                  </h6>
                  <h6
                    className={"text-black font-medium text-xl flex gap-x-10"}
                  >
                    <p className={"font-semibold max-lg:text-base"}>
                      Profession:{" "}
                    </p>
                    <p className={"text-lg max-lg:text-base"}>
                      {userProfileData?.data?.profession}
                    </p>
                  </h6>
                </div>
              </div>
            </div>

            <div
              className={
                "col-span-1 row-span-1 bg-white border border-primary rounded-3xl"
              }
            >
              <div
                className={
                  "h-2/5 text-white text-xl font-bold bg-primary px-3 py-1 rounded-tl-3xl rounded-tr-3xl"
                }
              >
                Email
              </div>
              <div className={"text-black text-lg px-3 py-3"}>
                {userProfileData?.data?.email}
              </div>
            </div>
            <div
              className={
                "col-span-1 row-span-1 bg-white border border-primary rounded-3xl"
              }
            >
              <div
                className={
                  "h-2/5 text-white text-xl font-bold bg-primary px-3 py-1 rounded-tl-3xl rounded-tr-3xl"
                }
              >
                Description
              </div>
              <div className={"text-black text-lg px-3 py-3"}>
                {userProfileData?.data?.description}
              </div>
            </div>
            <div
              className={
                "col-span-1 row-span-1 bg-white border border-primary rounded-3xl"
              }
            >
              <div
                className={
                  "h-2/5 text-white text-xl font-bold bg-primary px-3 py-1 rounded-tl-3xl rounded-tr-3xl"
                }
              >
                Total Blogs Posted
              </div>
              <div className={"text-black text-lg px-3 py-3"}>
                {userProfileData?.data?.blogs.length}
              </div>
            </div>
          </div>
        </main>
      )}
      {!isFetched && <Loader />}
    </>
  );
};
