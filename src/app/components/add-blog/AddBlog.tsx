import React, { useEffect, useState } from "react";
import { AddBlogForm } from "@/app/forms/AddBlogForm";
import { useRecoilValue } from "recoil";
import { showComponentAtom } from "@/app/recoil/showComponentAtom";

export const AddBlog: React.FC = () => {
  const showComponent = useRecoilValue(showComponentAtom);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (showComponent) setShow(true);
    else setShow(false);
  }, [showComponent]);
  return (
    <>
      {show ? (
        <main
          className={
            "relative overflow-scroll no-scrollbar max-lg:w-full mt-5 row-span-10 rounded-3xl px-5 py-3"
          }
        >
          <h1 className={"text-2xl w-fit font-sans font-semibold"}>
            Add a Blog
          </h1>
          <AddBlogForm />
        </main>
      ) : null}
    </>
  );
};
