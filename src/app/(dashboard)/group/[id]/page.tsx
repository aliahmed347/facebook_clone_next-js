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

const group = ({ params }: { params: { id: string } }) => {
  const { data, status }: any = useSession();
  const [group, setGroup] = useState<IGroup>();
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
    getGroup();
  }, [params.id]);

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

  //   const handelFollow = async () => {
  //     try {
  //       const res = await axios("/api/friend/sendReq", {
  //         method: "POST",
  //         data: {
  //           senderId: data.user?._id,
  //           userId: user?._id,
  //         },
  //       });
  //       setGroup(res.data.group);
  //     } catch (error) {
  //       console.log("🚀 ~ handelFollow ~ error:", error);
  //     }
  //   };
  //   const handelUnFollow = async () => {
  //     try {
  //       const res = await axios("/api/friend/removeReq", {
  //         method: "POST",
  //         data: {
  //           senderId: data.user?._id,
  //           userId: user?._id,
  //         },
  //       });
  //       setUser(res.data.user);
  //     } catch (error) {
  //       console.log("🚀 ~ handelFollow ~ error:", error);
  //     }
  //   };

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
              {group && (
                <GroupProfile
                  group={group}
                  setGroup={setGroup}
                  //   handelFollow={handelFollow}
                  //   handelUnFollow={handelUnFollow}
                />
              )}
              {group?.admin._id === data?.user._id && (
                <CreatePost group={group} />
              )}
              {posts && <PostsList posts={posts} />}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default group;
