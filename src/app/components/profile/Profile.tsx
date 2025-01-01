import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import fetchMyData from "@/app/utils/functions/sidebar/fetchMyData";
import { useRecoilValue } from "recoil";
import { showComponentAtom } from "@/app/recoil/showComponentAtom";
import { myDataAtom } from "@/app/recoil/myDataAtom";

interface ProfileProps {
  callback: (whichOneToUpdate: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ callback }) => {
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const { username }: { username: "" } = useParams<{ username: "" }>();
  const userProfileData = useRecoilValue(myDataAtom);
  console.log(`${process.env.NEXT_PUBLIC_SERVER_URI}${userProfileData.image}`);
  const showComponent = useRecoilValue(showComponentAtom);
  useEffect(() => {
    console.log(showComponent);
    if (showComponent) setIsFetched(true);
  }, [showComponent]);
  useEffect(() => {
    async function getData() {
      try {
        await fetchMyData(username);
        callback("myProfileData");
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    if (username) {
      getData();
    }
  });
  return (
    <>
      {isFetched ? (
        <main
          className={
            "relative no-scrollbar row-span-10 rounded-3xl px-5 py-3 overflow-scroll"
          }
        >
          <div
            className={
              "max-lg:w-full grid grid-cols-2 grid-rows-3 max-lg:flex max-lg:flex-col gap-x-28 gap-y-10 w-3/4 h-3/5 relative mt-20 rounded-3xl mx-auto"
            }
          >
            <div
              className={
                "max-lg:w-[90%] max-lg:pb-2 max-lg:mx-auto col-span-1 row-span-3 h-full bg-white border-4 border-primary rounded-3xl"
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
                    "rounded-full max-lg:w-20 max-lg:h-20 w-28 h-28 bg-cover bg-white border-4 border-primary"
                  }
                  src={`${process.env.NEXT_PUBLIC_SERVER_URI}${userProfileData.image}`}
                />
                <h4 className={"text-black font-bold max-lg:text-2xl text-3xl"}>
                  {userProfileData.name}
                </h4>
                <h5
                  className={"text-black font-medium max-lg:text-base text-xl"}
                >
                  {"( "}
                  {userProfileData.username}
                  {" )"}
                </h5>
                <div className={"flex flex-col gap-y-2 mt-5"}>
                  <h6
                    className={
                      "text-black font-medium max-lg:text-base text-xl flex max-lg:gap-x-5 gap-x-16"
                    }
                  >
                    <p className={"font-semibold"}>Country: </p>
                    <p className={"max-lg:text-base text-lg"}>
                      {userProfileData.country}
                    </p>
                  </h6>
                  <h6
                    className={
                      "text-black font-medium max-lg:text-base text-xl flex max-lg:gap-x-5 gap-x-10"
                    }
                  >
                    <p className={"font-semibold"}>Profession: </p>
                    <p className={"max-lg:text-base text-lg"}>
                      {userProfileData.profession}
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
                {userProfileData.email}
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
                {userProfileData.description}
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
                {userProfileData.blogs.length}
              </div>
            </div>
          </div>
        </main>
      ) : null}
    </>
  );
};
