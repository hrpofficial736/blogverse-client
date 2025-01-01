import React, { useEffect, useState } from "react";
import { MdDashboard, MdAddCircle } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useParams } from "next/navigation";
import Link from "next/link";
import fetchMyData from "@/app/utils/functions/sidebar/fetchMyData";
import { usePathname } from "next/navigation";
import logOut from "@/app/utils/functions/logOut/logOut";
import { sideBarOpenAtom } from "@/app/recoil/sideBarOpenState";
import { myDataAtom } from "@/app/recoil/myDataAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { showComponentAtom } from "@/app/recoil/showComponentAtom";

interface SideBarProps {
  callback: (whichOneToUpdate: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ callback }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useRecoilState(sideBarOpenAtom);
  const showComponent = useRecoilValue(showComponentAtom);
  const path = usePathname();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const { username }: { username: "" } = useParams<{ username: "" }>();
  const sideBarDataValue = useRecoilValue(myDataAtom);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSideBarOpen(true);
      } else {
        setIsSideBarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [setIsSideBarOpen]);
  useEffect(() => {
    if (showComponent) setIsFetched(true);
  }, [showComponent]);
  useEffect(() => {
    async function getData() {
      try {
        await fetchMyData(username);
        callback("sideBarData");
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    if (username) {
      getData();
    }
  }, [username]);
  const menus = [
    {
      id: 0,
      name: "Dashboard",
      icon: <MdDashboard />,
      path: `/${username}/dashboard`,
    },
    {
      id: 1,
      name: "My Profile",
      icon: <CgProfile />,
      path: `/${username}/my-profile`,
    },
    {
      id: 2,
      name: "Add a Blog",
      icon: <MdAddCircle />,
      path: `/${username}/add-blog`,
    },
    {
      id: 3,
      name: "Favorites",
      icon: <FaHeart />,
      path: `/${username}/favorites`,
    },
    {
      id: 4,
      name: "Settings",
      icon: <IoSettings />,
      path: `/${username}/settings`,
    },
  ];
  return (
    <>
      <main
        className={`${isFetched && isSideBarOpen ? "block" : "hidden"} rounded-br-3xl bg-zinc-200 shadow-md shadow-black max-lg:transition-all max-lg:duration-500 max-lg:absolute max-lg:left-0 max-lg:z-30 max-lg:w-full h-screen sticky top-0 col-span-2`}
      >
        <div
          className={
            "bg-primary relative w-full h-[25%] flex flex-col justify-center items-center gap-y-2"
          }
        >
          <div
            onClick={() => setIsSideBarOpen(false)}
            className="lg:hidden cursor-pointer px-1 py-1 ml-auto mr-2 rounded-full bg-white flex justify-center items-center"
          >
            <IoClose className="text-primary text-base" />
          </div>

          <img
            alt={"Profile"}
            className={
              "rounded-full bg-cover w-20 h-20 bg-white border-4 border-white"
            }
            src={`${process.env.NEXT_PUBLIC_SERVER_URI}${sideBarDataValue.image}`}
          />
          <div className={"flex flex-col justify-center items-center"}>
            <h4 className={"text-white font-bold text-2xl"}>
              {sideBarDataValue.name}
            </h4>
            <h5 className={"text-white font-medium"}>
              {"( "}
              {sideBarDataValue.username}
              {" )"}
            </h5>
          </div>
        </div>

        <div className={"bg-zinc-200 w-full h-[75%] rounded-br-3xl p-5"}>
          <ol className={"list-none h-full flex flex-col items-end  gap-y-3"}>
            {menus.map((menu) => {
              return (
                <li
                  key={menu.id}
                  className={`w-[80%] h-[50px] pl-2 rounded-3xl font-semibold cursor-pointer ${path === menu.path ? "bg-primary text-white" : "bg-transparent"} flex items-center gap-x-5 w-full hover:bg-primary hover:text-white`}
                >
                  <Link
                    className="w-full h-full flex items-center gap-x-5"
                    href={menu.path}
                  >
                    {menu.icon} {menu.name}
                  </Link>
                </li>
              );
            })}
            <li
              onClick={async () => {
                await logOut();
              }}
              className={
                "rounded-3xl mt-auto font-semibold cursor-pointer py-3 flex px-3 items-center gap-x-5 w-full hover:bg-red-600 hover:text-white"
              }
            >
              <Link
                className="w-full h-full flex items-center gap-x-5"
                href={"/login"}
              >
                {<CiLogout />} {"Log Out"}
              </Link>
            </li>
          </ol>
        </div>
      </main>
    </>
  );
};

export default SideBar;
