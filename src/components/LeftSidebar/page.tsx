"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { leftSidebarItems } from "../../../utils/leftsidebarItems";
import useLoaderStore from "../../../store/loaderStore";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IUser } from "@/types";
import LeftSidebarSkelton from "../Skeltons/LeftSidebar";
import Link from "next/link";
import useUserStore from "../../../store/userStore";

const LeftSidebar = () => {
  const { data, status }: any = useSession();
  const { sidebar, setSidebar } = useLoaderStore();
  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>(true);
  const { user, loadUser, groups } = useUserStore();

  useEffect(() => {
    if (status === "unauthenticated") {
      setLoading(false);
      return router.push("/login");
    }
    if (data?.user) {
      setLoading(false);
    }
  }, [data, status]);
  return (
    <>
      {loading || loadUser ? (
        <LeftSidebarSkelton />
      ) : (
        <div
          className={`w-full sm:w-1/2 lg:w-1/4 p-4 left-0 -top-2 lg:top-0 h-[110%] lg:max-h-[calc(100vh-70px)] -bottom-0 z-[2000] lg:block absolute bg-backgroundColor lg:relative lg:bg-transparent transition-all ease-in-out duration-300 transform overflow-y-auto no-scrollbar ${
            sidebar
              ? "translate-x-0 opacity-100 "
              : "-translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100"
          } `}
        >
          <div className="w-full my-2  ">
            <Link
              href={`/user/${user?._id}`}
              className="flex justify-start items-center gap-3 cursor-pointer"
            >
              {user?.avatar && (
                <Image src={user?.avatar} alt="user" width={30} height={30} />
              )}
              <h4 className="text-base font-semibold whitespace-nowrap">
                {user?.firstName + " " + user?.lastName}
              </h4>
            </Link>

            <ul className="mt-3 mr-8">
              {leftSidebarItems.map((item, index) => (
                <Link
                  key={index}
                  className="flex justify-start items-center h-auto gap-3 hover:bg-[#E4E6E9] px-2 py-2 cursor-pointer rounded-lg"
                  href={item.url}
                >
                  <Image
                    src={`/asset/images${item.icon}`}
                    alt={item.label}
                    width={30}
                    height={30}
                    className="w-6 h-auto"
                  />
                  <span className="text-base font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              ))}
            </ul>
            {/* <div className="w-full "></div> */}
            <div className="w-full mt-3">
              <h3 className="text-lg font-semibold">Your Group</h3>
              {groups &&
                groups.map((group, index) => (
                  <Link
                    href={`/group/${group._id}`}
                    key={index}
                    className="flex justify-start items-center gap-3 hover:bg-[#E4E6E9] px-2 py-2 cursor-pointer rounded-lg "
                  >
                    <Image
                      src={group.avatar}
                      alt="user"
                      width={35}
                      height={35}
                      className="border border-secondaryText rounded-full"
                    />
                    <h4 className="text-base font-medium">{group.name}</h4>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftSidebar;
