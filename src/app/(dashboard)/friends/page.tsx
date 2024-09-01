"use client";
import FollowButton from "@/components/FollowButton/page";
import FollowUserProfile from "@/components/FollowUserProfile/page";
import FriendsSkelton from "@/components/Skeltons/Friends";
import { IPost, IUser } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Friends = () => {
  const { data, status }: any = useSession();
  const [user, setUser] = useState<IUser>();
  const [users, setUsers] = useState<{
    receiveRequests: IUser[];
    sentRequests: IUser[];
    suggestedPeople: IUser[];
  }>();
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
    if (data?.user) {
    }
  }, [data, status]);

  useEffect(() => {
    getAllFriends();
  }, []);

  const getAllFriends = async () => {
    try {
      //   setLoading(true);
      const res = await axios("/api/friend/getAllFriends", {
        method: "GET",
      });
      setUsers(res.data);
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
              <FriendsSkelton />
            </>
          ) : (
            <>
              <div className="w-full">
                <h1 className="text-xl font-bold">Friends</h1>
              </div>
              {users?.receiveRequests && users?.receiveRequests?.length > 0 && (
                <div className="w-full ">
                  <h1 className="text-xl font-medium mt-1">Receive Requests</h1>
                  {users?.receiveRequests?.map((user: IUser) => {
                    return (
                      <>
                        <FollowUserProfile
                          user={user}
                          refreshHandler={getAllFriends}
                        />
                      </>
                    );
                  })}
                </div>
              )}
              {users?.sentRequests && users?.sentRequests?.length > 0 && (
                <div className="w-full ">
                  <h1 className="text-xl font-medium mt-1">Sent Requests</h1>
                  {users?.sentRequests?.map((user: IUser) => {
                    return (
                      <>
                        <FollowUserProfile
                          user={user}
                          refreshHandler={getAllFriends}
                        />
                      </>
                    );
                  })}
                </div>
              )}
              {users?.suggestedPeople && users?.suggestedPeople?.length > 0 && (
                <div className="w-full ">
                  <h1 className="text-xl font-medium mt-1">Suggested People</h1>
                  {users?.suggestedPeople?.map((user: IUser) => {
                    return (
                      <>
                        <FollowUserProfile
                          user={user}
                          refreshHandler={getAllFriends}
                        />
                      </>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Friends;
{
  /* <div className="w-full bg-white flex items-center">
                      <div className="">
                        <Image
                          src="/asset/images/profile.png"
                          alt="Image"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="">
 <h1>{user.firstName+" "+user.lastName }</> 
                    </div> */
}
