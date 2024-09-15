"use client";
import React, { useEffect, useState } from "react";
import { IGroup, IPost } from "@/types";
import Image from "next/image";
import axios from "axios";
import PostsList from "@/components/PostsList/page";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import GroupPageSkelton from "@/components/Skeltons/GroupPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const [loading, setLoading] = useState(true);
  // const { groups } = useUserStore();
  const [groups, setGroups] = useState<IGroup[]>();
  const [posts, setPosts] = useState<IPost[]>();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
  }, [status]);
  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    try {
      setLoading(true);
      const { data } = await axios("/api/group/getAllJoinGroups", {
        method: "GET",
      });
      setGroups(data.groups);
      let p: IPost[] = data.groups.flatMap((group: IGroup) =>
        group.posts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );

      setPosts(p);
    } catch (error) {
      console.log("🚀 ~ getGroups ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-full flex justify-center items-center ">
      <div className="w-full lg:w-3/4 ">
        {loading ? (
          <>
            <GroupPageSkelton />
          </>
        ) : (
          <>
            {groups?.length == 0 ? (
              <>
                <div className="w-full h-full grid place-content-center">
                  <div className="w-full bg-white rounded-lg p-3">
                    <p className="text-center">
                      You are not joined to any group yet please discover some
                      groups
                    </p>
                    <Link href="/groups/discover" className="">
                      <Button
                        className="bg-primary flex justify-center items-center gap-2 mt-3"
                        fullWidth
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        // onClick={() => setGroupModal({ open: true })}
                      >
                        Discover more groups
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full mb-3">
                  <h1 className="text-xl font-bold">Groups</h1>
                </div>
                <div className="max-w-full overflow-x-auto flex gap-2 no-scrollbar">
                  <div className="flex gap-2 w-max no-scrollbar">
                    {groups?.map((group: IGroup, index) => {
                      return (
                        <Link
                          key={index} // Unique key for each item
                          href={`/group/${group._id}`}
                          className="rounded-lg w-24 h-32 flex-shrink-0 flex flex-col justify-center items-center p-2 bg-white"
                        >
                          <Image
                            src={group.avatar}
                            alt={group.name}
                            width={70}
                            height={70}
                            className="rounded-full"
                          />
                          <h4 className="text-base font-semibold">
                            {group.name}
                          </h4>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3">
                  <h1 className="text-xl font-medium mt-1">Recent activity</h1>
                  {posts && <PostsList posts={posts} />}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default page;
