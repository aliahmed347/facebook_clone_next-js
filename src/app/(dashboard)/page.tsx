import CreatePost from "@/components/Post/CreatePost";
import Post from "@/components/Post/page";
import PostsList from "@/components/PostsList/page";
import { IconPhotoPlus, IconPhotoVideo } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <section className="w-full  flex justify-center items-center py-3 ">
      <div className="w-3/4 h-[calc(100vh-88px)] overflow-y-auto  no-scrollbar ">
        <CreatePost />
        <PostsList />
      </div>
    </section>
  );
};

export default Page;
