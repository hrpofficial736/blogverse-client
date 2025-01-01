import { BlogInterface } from "@/app/interfaces/blogs/blogInterface";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { tokenAtom } from "@/app/recoil/tokenState";
import { getRecoil } from "recoil-nexus";
import { useRecoilValue } from "recoil";
import { showComponentAtom } from "@/app/recoil/showComponentAtom";
import { myDataAtom } from "@/app/recoil/myDataAtom";

interface BlogsProps {
  callback: (whichOneToUpdate: string) => void;
}

export const Blogs: React.FC<BlogsProps> = ({ callback }) => {
  const [blogs, setBlogs] = useState<BlogInterface[]>();
  const showComponent: boolean = useRecoilValue(showComponentAtom);
  const myData = useRecoilValue(myDataAtom);
  const [isFetched, setIsFetched] = useState(false);
  const router = useRouter();
  const token = getRecoil(tokenAtom);
  const { username }: { username: string } = useParams<{ username: string }>();
  useEffect(() => {
    console.log(showComponent);
    if (showComponent) setIsFetched(true);
  }, [showComponent]);
  useEffect(() => {
    const fetchData = () => {
      const data: BlogInterface[] = myData.blogs;
      setBlogs((prevBlogs) =>
        [...(prevBlogs ? prevBlogs : []), ...data].filter(
          (blog, index, self) =>
            index === self.findIndex((b) => b.id === blog.id),
        ),
      );

      callback("blogsData");
    };
    fetchData();
  }, [username, token, myData]);
  return (
    <>
      {isFetched && (
        <div
          className={`row-span-10 max-lg:overflow-scroll max-lg:no-scrollbar max-lg:w-[90%] max-lg:mx-auto rounded-3xl px-5 py-3 mt-10`}
        >
          <h1 className={"text-2xl w-fit font-sans font-semibold"}>My Blogs</h1>
          {blogs?.length === 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <h1 className={"text-md text-zinc-500 font-semibold"}>
                No Blogs Found !
              </h1>
            </div>
          )}
          <div className="max-lg:flex max-lg:flex-col max-lg:overflow-y-scroll max-lg:no-scrollbar grid grid-cols-5 auto-rows-fr gap-6 m-auto mt-5 max-w-full rounded-3xl">
            {blogs?.map((blog, index) => (
              <div
                onClick={() => {
                  localStorage.setItem(
                    "blogData",
                    JSON.stringify({
                      id: blog.id,
                      title: blog.title,
                      content: blog.blogDescription,
                      author: blog.authorName,
                      coverImage: blog.coverImage,
                    }),
                  );
                  router.push(`/${username}/blogs/${blog.id}`);
                }}
                className="border-b-4 h-[40vh] row-span-1 border-r-8 border-r-primary border-b-primary
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
