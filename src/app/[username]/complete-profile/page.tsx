"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CompleteYourProfile } from "../../components/complete-profile/CompleteYourProfile";
import { useParams, useRouter } from "next/navigation";
import { Loader } from "@/app/components/utils/loader/Loader";
import { tokenAtom } from "@/app/recoil/tokenState";
import { useRecoilValue } from "recoil";
import { myDataAtom } from "@/app/recoil/myDataAtom";
import fetchMyData from "@/app/utils/functions/sidebar/fetchMyData";

const CompleteYourProfilePage: React.FC = () => {
  const [showComponent, setShowComponent] = useState<boolean>(false);
  const { username }: { username: string } = useParams<{
    username: string;
  }>();
  const toggleLoader = () => {
    setShowComponent(false);
  };
  const myDataValue = useRecoilValue(myDataAtom);
  const router = useRouter();
  const token = useRecoilValue(tokenAtom);
  useEffect(() => {
    if (token == null) {
      router.push("/login");
      return;
    }
    const fetchData = async () => await fetchMyData(username);
    fetchData();
    if (
      myDataValue.image &&
      myDataValue.country &&
      myDataValue.profession &&
      myDataValue.description
    ) {
      console.log("Ye le data : ", myDataValue);
      setShowComponent(false);
      router.push(`/${username}/dashboard`);
      return;
    } else {
      console.log(myDataValue);
      setShowComponent(false);
    }
  }, [myDataValue]);
  return (
    <>
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "tween", duration: 0.4 }}
      >
        {showComponent && (
          <main
            style={{ backgroundColor: "whitesmoke" }}
            className="min-h-screen max-lg:w-screen relative h-screen"
          >
            <h3 className="font-[Dancing] text-primary font-bold text-3xl p-6 pt-7">
              BlogVerse
            </h3>
            <CompleteYourProfile toggleLoader={toggleLoader} />
          </main>
        )}
      </motion.div>
      {!showComponent && <Loader />}
    </>
  );
};

export default CompleteYourProfilePage;
