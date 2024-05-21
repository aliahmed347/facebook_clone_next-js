"use client";
import CreatePost from "@/components/Post/CreatePost";
import Post from "@/components/Post/page";
import PostsList from "@/components/PostsList/page";
import { IconPhotoPlus, IconPhotoVideo } from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        await axios({
          url: "/api/auth/validateToken",
          method: "POST",
          headers: {
            token,
          },
        });
      } catch (error) {
        console.log("🚀 ~ validateToken ~ error:", error);
        router.push("/login");
      }
    };

    validateToken();
  }, []);
  return (
    <section className="w-  full  flex justify-center items-center py-3 ">
      <div className="w-full lg:w-3/4 h-[calc(100vh-136px)] xl:h-[calc(100vh-88px)] overflow-y-auto  no-scrollbar ">
        <CreatePost />
        <PostsList />
      </div>
    </section>
  );
};

export default Page;
