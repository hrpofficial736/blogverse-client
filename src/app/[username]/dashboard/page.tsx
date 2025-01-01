"use client";

import React, { useState, useEffect } from "react";
import {
  SearchBar,
  SideBar,
  Blogs,
} from "../../exports/components/dashboard/exports";
import { Loader } from "@/app/components/utils/loader/Loader";
import { IoMdMenu } from "react-icons/io";

import { useParams, useRouter } from "next/navigation";
import UsersList from "@/app/components/utils/search/UsersList";
import { tokenAtom } from "@/app/recoil/tokenState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { sideBarOpenAtom } from "@/app/recoil/sideBarOpenState";
import { showComponentAtom } from "@/app/recoil/showComponentAtom";
import fetchMyData from "@/app/utils/functions/sidebar/fetchMyData";
import { myDataAtom } from "@/app/recoil/myDataAtom";

const Dashboard: React.FC = () => {
  const { username }: { username: string } = useParams();
  useEffect(() => {
    const fetchData = async () => fetchMyData(username);
    fetchData();
  }, []);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const myData = useRecoilValue(myDataAtom);
  const setShowComponentState = useSetRecoilState(showComponentAtom);
  const [isDataFetched, setIsDataFetched] = useState({
    sideBarData: false,
    blogsData: false,
  });
  const handleLoaderDisplay = (updatedData: {
    sideBarData: boolean;
    blogsData: boolean;
  }) => {
    if (updatedData.blogsData || updatedData.sideBarData) {
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
      if (updatedData.blogsData && updatedData.sideBarData) {
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
      <main className={"grid grid-cols-12 w-screen"}>
        <SideBar callback={handleCallback} />
        <div
          className={`grid auto-rows-fr col-span-10 lg:m-3 max-lg:w-screen px-2 h-screen overflow-hidden relative`}
        >
          {isDataFetched.blogsData && myData !== null ? (
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
          <Blogs callback={handleCallback} />
        </div>
      </main>
      {showLoader && <Loader />}
    </>
  );
};

export default Dashboard;
