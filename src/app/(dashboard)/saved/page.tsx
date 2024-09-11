"use client";
import PostsList from "@/components/PostsList/page";
import PostListSkelton from "@/components/Skeltons/PostListSkelton";
import { IPost,  } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { status }: any = useSession();
  const [posts, setPosts] = useState<IPost[]>();
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
  }, [status]);

  useEffect(() => {
    getSavedPosts();
  }, []);

  const getSavedPosts = async () => {
    //   setLoading(true);
    try {
      const res = await axios("/api/posts/getSavedPosts", {
        method: "GET",
      });
      setPosts(res.data.posts);
    } catch (error) {
      console.log("🚀 ~ Friends ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="w-full flex justify-center items-center py-3 ">
        <div className="w-full lg:w-3/4 h-[calc(100vh-136px)] xl:h-[calc(100vh-88px)] overflow-y-auto  no-scrollbar ">
          {loading ? (
            <>
              <div className="w-full">
                <h1 className="text-xl font-bold w-28 h-4 bg-gray-500 rounded-lg"></h1>
              </div>
              <PostListSkelton />
            </>
          ) : (
            <>
              <div className="w-full">
                <h1 className="text-xl font-bold">Saved Posts</h1>
              </div>
              {posts && posts?.length !== 0 ? (
                <PostsList posts={posts} />
              ) : (
                <div className="w-full h-full grid place-content-center">
                  <div className="p-2 rounded-md bg-white">
                    <p>You are not save any post</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
