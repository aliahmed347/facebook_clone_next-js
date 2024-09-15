import React, { useEffect, useState } from "react";
import Post from "../Post/page";
import axios from "axios";
import PostListSkelton from "../Skeltons/PostListSkelton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IPost } from "@/types";

const PostsList = ({ posts }: { posts: IPost[] }) => {
  const router = useRouter();

  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
  }, [status]);
  return (
    <div className="w-full   mt-3 flex justify-center items-center gap-3 flex-col  ">
      {posts.map((post: any, index) => (
        <Post key={index} myPost={post} />
      ))}
    </div>
  );
};

export default PostsList;
