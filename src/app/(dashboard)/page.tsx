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
import getSession from "../../../utils/getSession";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const validateSession = async () => {
      // setLoading(true);
      try {
        const user = await getSession();
        // setLoading(false);
      } catch (error) {
        // setLoading(false);
        await router.push("/");
        console.log("🚀 ~ validateToken ~ error:", error);
      }
    };

    validateSession();
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
