"use client";
import CreatePost from "@/components/Post/CreatePost";
import CreatePostSkelton from "@/components/Skeltons/CreatePost";
import PostsList from "@/components/PostsList/page";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import PostListSkelton from "@/components/Skeltons/PostListSkelton";
import { IPost } from "@/types";
import axios from "axios";
import useUserStore from "../../../store/userStore";

const Page = () => {
  const router = useRouter();
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState<IPost[]>();
  const { status } = useSession();
  const { setUser, user, setLoadUser, loadUser } = useUserStore();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
    if (status === "authenticated") {
    }
  }, [status]);

  const getAllPosts = async () => {
    try {
      setLoadingPosts(true);
      const res = await axios("api/posts/getAllPosts", {
        method: "POST",
      });
      setPosts(res.data.posts);
    } catch (error) {
      console.log("🚀 ~ getAllPosts ~ error:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <section className="w-full flex justify-center items-center py-3 ">
      <div className="w-full lg:w-3/4 h-[calc(100vh-136px)] xl:h-[calc(100vh-88px)] overflow-y-auto  no-scrollbar ">
        {loadUser ? (
          <>
            <CreatePostSkelton />
          </>
        ) : (
          <>
            <CreatePost />
          </>
        )}
        {loadingPosts ? (
          <PostListSkelton />
        ) : (
          posts && <PostsList posts={posts} />
        )}
      </div>
    </section>
  );
};

export default Page;
