"use client";

import React, { useState, useEffect } from "react";
import {
  SideBar,
  SearchBar,
  AddBlog,
} from "@/app/exports/components/dashboard/exports";
import { Loader } from "@/app/components/utils/loader/Loader";
import { useRouter } from "next/navigation";
import { tokenAtom } from "@/app/recoil/tokenState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { sideBarOpenAtom } from "@/app/recoil/sideBarOpenState";
import { IoMdMenu } from "react-icons/io";
import UsersList from "@/app/components/utils/search/UsersList";
import { showComponentAtom } from "@/app/recoil/showComponentAtom";

const AddBlogPage: React.FC = () => {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const setShowComponentState = useSetRecoilState(showComponentAtom);
  const [isDataFetched, setIsDataFetched] = useState({
    sideBarData: false,
  });

  const handleLoaderDisplay = (updatedData: { sideBarData: boolean }) => {
    if (updatedData.sideBarData) {
      setShowLoader(false);
    } else {
      setShowLoader(true);
    }
  };

  const handleCallback = (whichOneToUpdate: string) => {
    setIsDataFetched((prevData) => {
      const updatedData = { ...prevData, [whichOneToUpdate]: true };
      console.log(whichOneToUpdate, "updated");
      handleLoaderDisplay(updatedData);
      if (updatedData.sideBarData) {
        setShowComponentState(true);
      } else {
        setShowComponentState(false);
      }
      return updatedData;
    });
  };

  const [isSideBarOpen, setIsSideBarOpen] = useRecoilState(sideBarOpenAtom);
  const token = useRecoilValue(tokenAtom);
  const router = useRouter();
  useEffect(() => {
    if (token === null) {
      router.push("/login");
    }
  }, [token]);
  return (
    <>
      <main className={"grid grid-cols-12"}>
        <SideBar callback={handleCallback} />

        <div
          className={`grid auto-rows-fr col-span-10 lg:m-3 max-lg:w-screen px-2 h-screen overflow-hidden relative`}
        >
          {isDataFetched.sideBarData ? (
            <div className="flex gap-x-6 mt-5 lg:justify-center items-center">
              <div
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                className="lg:hidden cursor-pointer w-10 h-10 bg-zinc-200 rounded-full flex justify-center items-center"
              >
                <IoMdMenu color="black" />
              </div>
              <SearchBar />
            </div>
          ) : null}
          <UsersList />
          <AddBlog />
        </div>
      </main>
      {showLoader && <Loader />}
    </>
  );
};

export default AddBlogPage;