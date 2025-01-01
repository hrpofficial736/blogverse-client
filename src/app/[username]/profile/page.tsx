"use client";

import React, { useEffect, useState } from "react";
import { OtherUserProfile } from "@/app/components/otherUserProfile/OtherUserProfile";
import { OtherUserBlogs } from "@/app/components/otherUserBlogs/OtherUserBlogs";
import { tokenAtom } from "@/app/recoil/tokenState";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { showComponentAtom } from "@/app/recoil/showComponentAtom";
import { Loader } from "@/app/components/utils/loader/Loader";

const ProfilePage: React.FC = () => {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const setShowComponentState = useSetRecoilState(showComponentAtom);
  const [isDataFetched, setIsDataFetched] = useState({
    profileData: false,
    blogsData: false,
  });
  const handleLoaderDisplay = (updatedData: {
    profileData: boolean;
    blogsData: boolean;
  }) => {
    if (updatedData.profileData && updatedData.blogsData) {
      setShowLoader(false);
    } else {
      setShowLoader(true);
    }
  };

  const handleCallback = (whichOneToUpdate: string) => {
    setIsDataFetched((prevData) => {
      const updatedData = { ...prevData, [whichOneToUpdate]: true };
      handleLoaderDisplay(updatedData);
      if (updatedData.profileData && updatedData.blogsData) {
        setShowComponentState(true);
      } else {
        setShowComponentState(false);
      }
      return updatedData;
    });
  };

  const token = useRecoilValue(tokenAtom);
  const router = useRouter();
  useEffect(() => {
    if (token === null) {
      router.push("/login");
    }
  });
  return (
    <main className="max-lg:w-screen max-lg:h-screen max-lg:overflow-scroll max-lg:no-scrollbar">
      <h3 className="font-[Dancing] text-primary font-bold text-3xl p-6 pt-7">
        BlogVerse
      </h3>
      {isDataFetched.profileData && isDataFetched.blogsData ? (
        <>
          <OtherUserProfile callback={handleCallback} />
          <OtherUserBlogs callback={handleCallback} />
        </>
      ) : null}
      {showLoader && <Loader />}
    </main>
  );
};

export default ProfilePage;
