"use client";
import CreatePost from "@/components/Post/CreatePost";
import PostsList from "@/components/PostsList/page";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

const Page = () => {
  const [user, setUser] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const validateUser = async () => {
      try {
        const session = await getSession();
        if (!session) {
          router.push("/login");
        }
        setUser(session?.user);
      } catch (error) {
        console.log("🚀 ~ validateUser ~ error:", error);
        router.push("/login");
      }
    };
    validateUser();
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
