"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader } from "@/app/components/utils/loader/Loader";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import getFavoriteBlogs from "@/app/utils/functions/getFavoriteBlogs/getFavoriteBlogs";
import { BlogInterface } from "@/app/interfaces/blogs/blogInterface";
import favoriteABlog from "@/app/utils/functions/favoriteABlog/favoriteABlog";
import unfavoriteABlog from "@/app/utils/functions/unfavoriteABlog/unfavoriteABlog";
import { getRecoil } from "recoil-nexus";
import { tokenAtom } from "@/app/recoil/tokenState";
import { useRecoilValue } from "recoil";
import { Footer } from "@/app/components/landing-page/Footer";

const BlogPage = () => {
  const { username }: { username: string } = useParams<{ username: string }>();
  const [isFetched, setIsFetched] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [blog, setBlog] = useState({
    id: 0,
    title: "",
    author: "",
    content: "",
    coverImage: "",
  });
  const router = useRouter();
  const token = useRecoilValue(tokenAtom);

  useEffect(() => {
    if (token == null) {
      console.log(token);
      router.push("/login");
    }
    const fetchDetails = async (username: string) => {
      const token = getRecoil(tokenAtom);
      if (!token) router.push("/login");
      else {
        const data = JSON.parse(localStorage.getItem("blogData")!);
        const getFavoriteBlogsList: BlogInterface[] =
          await getFavoriteBlogs(username);
        setBlog(data);
        getFavoriteBlogsList.map((favoritedBlog) => {
          if (favoritedBlog.id === blog.id) setIsFavorited(true);
        });
        setIsFetched(true);
      }
    };
    fetchDetails(username);
  }, [token]);

  const favoriteABlogHandler = async () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited) await favoriteABlog(username, blog.id);
    else await unfavoriteABlog(username, blog.id);
  };
  return (
    <>
      {isFetched && (
        <main className="w-screen h-screen">
          <div className="lg:w-full h-1/2 bg-primary rounded-bl-3xl rounded-br-3xl">
            <h3 className="font-[Dancing] text-white font-bold text-3xl max-lg:p-3">
              BlogVerse
            </h3>
            <div
              onClick={() => favoriteABlogHandler()}
              className="cursor-pointer bg-white p-1 rounded-full w-10 h-10 absolute max-lg:right-7 lg:right-10 flex justify-center items-center"
            >
              {isFavorited ? (
                <FaHeart color="red" size={20} />
              ) : (
                <FaRegHeart size={20} />
              )}
            </div>
            <div className="flex flex-col justify-center items-center gap-y-5 max-lg:mt-20">
              <h1 className="text-3xl lg:text-6xl text-white font-bold font-sans text-center mt-2">
                {blog.title}
              </h1>
              <div className="flex flex-col justify-center items-center">
                <img
                  src={`${process.env.NEXT_PUBLIC_SERVER_URI}/uploads/hrpofficial736/profilePhoto/prabhu.jpg`}
                  className="rounded-full w-10 h-10 border-2 border-white mt-2"
                />
                <h6 className="lg:text-xl font-[MerriWeather] text-white mt-2">
                  {blog.author}
                </h6>
              </div>
              <img
                className="rounded-3xl max-lg:w-[90%] lg:w-[650px] lg:h-96"
                src={`${process.env.NEXT_PUBLIC_SERVER_URI}${blog.coverImage}`}
              />

              <p className="w-[90%] lg:max-w-[80%] mt-5">{blog.content}</p>
            </div>
            <Footer />
          </div>
        </main>
      )}
      {!isFetched && <Loader />}
    </>
  );
};

export default BlogPage;
