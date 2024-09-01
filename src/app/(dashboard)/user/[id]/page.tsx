"use client";
import CreatePost from "@/components/Post/CreatePost";
import PostsList from "@/components/PostsList/page";
import CreatePostSkelton from "@/components/Skeltons/CreatePost";
import PostListSkelton from "@/components/Skeltons/PostListSkelton";
import UserProfileSkelton from "@/components/Skeltons/UserProfile";
import UserProfile from "@/components/UserProfile/page";
import { IPost, IUser } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const user = ({ params }: { params: { id: string } }) => {
  const { data, status }: any = useSession();
  const [user, setUser] = useState<IUser>();
  const [posts, setPosts] = useState<IPost[]>();
  const [Loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
    if (data?.user) {
      // setUser(data?.user);
    }
  }, [data, status]);

  useEffect(() => {
    getUser();
  }, [params.id]);

  const getUser = async () => {
    if (!params.id) return;
    try {
      const { data } = await axios(`/api/user/${params.id}`, {
        method: "GET",
      });
      setUser(data.user);
      setPosts(data.posts);
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ getUser ~ error:", error);
    }
  };

  const handelFollow = async () => {
    try {
      const res = await axios("/api/friend/sendReq", {
        method: "POST",
        data: {
          senderId: data.user?._id,
          userId: user?._id,
        },
      });
      setUser(res.data.user);
    } catch (error) {
      console.log("🚀 ~ handelFollow ~ error:", error);
    }
  };
  const handelUnFollow = async () => {
    try {
      const res = await axios("/api/friend/removeReq", {
        method: "POST",
        data: {
          senderId: data.user?._id,
          userId: user?._id,
        },
      });
      setUser(res.data.user);
    } catch (error) {
      console.log("🚀 ~ handelFollow ~ error:", error);
    }
  };

  return (
    <>
      <section className="w-full flex justify-center items-center py-3 ">
        <div className="w-full lg:w-3/4 h-[calc(100vh-136px)] xl:h-[calc(100vh-88px)] overflow-y-auto  no-scrollbar ">
          {Loading ? (
            <>
              <UserProfileSkelton />
              {data?.user._id === params.id && <CreatePostSkelton />}
              <PostListSkelton />
            </>
          ) : (
            <>
              {user && (
                <UserProfile
                  user={user}
                  setUser={setUser}
                  handelFollow={handelFollow}
                  handelUnFollow={handelUnFollow}
                />
              )}
              {data?.user._id === params.id && <CreatePost />}
              {posts && <PostsList posts={posts} />}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default user;
