"use client";
import GroupProfile from "@/components/GroupProfile/page";
import CreatePost from "@/components/Post/CreatePost";
import PostsList from "@/components/PostsList/page";
import CreatePostSkelton from "@/components/Skeltons/CreatePost";
import PostListSkelton from "@/components/Skeltons/PostListSkelton";
import UserProfileSkelton from "@/components/Skeltons/UserProfile";
import UserProfile from "@/components/UserProfile/page";
import { IGroup, IPost, IUser } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useUserStore from "../../../../../store/userStore";

const page = ({ params }: { params: { id: string } }) => {
  const { status }: any = useSession();
  const { user } = useUserStore();
  const [group, setGroup] = useState<IGroup>();
  const [posts, setPosts] = useState<IPost[]>();
  const [Loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
  }, [status]);

  useEffect(() => {
    getGroup();
  }, [params.id]);

  useEffect(() => {
    setPosts(group?.posts);
  }, [group]);

  const getGroup = async () => {
    if (!params.id) return;
    try {
      const { data } = await axios(`/api/group/${params.id}`, {
        method: "GET",
      });
      setGroup(data.group);
      setPosts(data.group.posts);
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ getUser ~ error:", error);
    }
  };

  return (
    <>
      <section className={`w-full flex justify-center items-center`}>
        <div className="w-full lg:w-3/4 ">
          {Loading ? (
            <>
              <UserProfileSkelton />
              {user._id === params.id && <CreatePostSkelton />}
              <PostListSkelton />
            </>
          ) : (
            <>
              {group && (
                <>
                  <GroupProfile group={group} setGroup={setGroup} />
                  {group.admin._id == user._id ? (
                    <>
                      <CreatePost group={group} />
                      {posts && <PostsList posts={posts} />}
                    </>
                  ) : (
                    <>
                      {group.members.some((m) => m._id === user._id) && (
                        <>
                          <CreatePost group={group} />
                          {posts && <PostsList posts={posts} />}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
