"use client";

import { BlogInterface } from "@/app/interfaces/blogs/blogInterface";
import { showComponentAtom } from "@/app/recoil/showComponentAtom";
import fetchBlogs from "@/app/utils/functions/dashboard/fetchBlogs";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface OtherUserBlogsProps {
  callback: (whichOneToUpdate: string) => void;
}

export const OtherUserBlogs: React.FC<OtherUserBlogsProps> = ({ callback }) => {
  const [blogs, setBlogs] = useState<BlogInterface[]>();
  const [isFetched, setIsFetched] = useState(false);
  const router = useRouter();
  const { username }: { username: string } = useParams<{ username: string }>();
  const showComponent = useRecoilValue(showComponentAtom);
  useEffect(() => {
    console.log(showComponent);
    if (showComponent) setIsFetched(true);
  }, [showComponent]);
  useEffect(() => {
    const fetchData = async () => {
      const data: BlogInterface[] = await fetchBlogs(username);
      setBlogs((prevBlogs) =>
        [...(prevBlogs ? prevBlogs : []), ...data].filter(
          (blog, index, self) =>
            index === self.findIndex((b) => b.id === blog.id),
        ),
      );
      callback("blogsData");
    };
    fetchData();
  });
  return (
    <>
      {isFetched && (
        <div className={"rounded-3xl px-10 py-3 relative min-h-[300px]"}>
          <h1 className={"text-2xl w-fit font-sans font-semibold"}>Blogs</h1>
          {blogs?.length === 0 && (
            <h6
              className={
                "absolute flex justify-center items-center inset-0 text-md text-zinc-500 font-semibold"
              }
            >
              No Blogs Found !
            </h6>
          )}
          <div className="max-lg:flex max-lg:flex-col grid grid-cols-5 auto-rows-fr gap-6 m-auto mt-5 max-w-full rounded-3xl">
            {blogs?.map((blog, index) => (
              <div
                onClick={() => {
                  localStorage.setItem(
                    "blogData",
                    JSON.stringify({
                      title: blog.title,
                      author: blog.authorName,
                      coverImage: blog.coverImage,
                    }),
                  );
                  router.push(`/${username}/blogs/${blog.id}`);
                }}
                className="border-b-4 h-[45vh] row-span-1 border-r-4 border-r-primary border-b-primary
                rounded-3xl bg-white flex flex-col gap-3 cursor-pointer hover:opacity-85
                hover:transition-all hover:duration-500"
                key={index}
              >
                <img
                  alt="Blog Image"
                  src={`${process.env.NEXT_PUBLIC_SERVER_URI}${blog.coverImage}`}
                  className="rounded-tr-3xl rounded-tl-3xl w-full h-[60%] object-cover"
                />
                <h1 className="text-xl text-center font-bold my-1">
                  {blog.title}
                </h1>
                <h1 className="text-sm text-center font-bold my-1">
                  {blog.category}
                </h1>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
