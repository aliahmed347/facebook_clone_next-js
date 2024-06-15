"use client";
import CreatePost from "@/components/Post/CreatePost";
import CreatePostSkelton from "@/components/Skeltons/CreatePost";
import PostsList from "@/components/PostsList/page";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import PostListSkelton from "@/components/Skeltons/PostListSkelton";

const Page = () => {
  const router = useRouter();
  const [Loading, setLoading] = useState(true);
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
    if (status === "authenticated") {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <section className="w-  full  flex justify-center items-center py-3 ">
      <div className="w-full lg:w-3/4 h-[calc(100vh-136px)] xl:h-[calc(100vh-88px)] overflow-y-auto  no-scrollbar ">
        {Loading ? (
          <>
            <CreatePostSkelton />
            <PostListSkelton />
          </>
        ) : (
          <>
            <CreatePost />
            <PostsList />
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
