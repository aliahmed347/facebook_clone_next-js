"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { leftSidebarItems } from "../../../utils/leftsidebarItems";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { IUser } from "@/types";
import FollowButton from "../FollowButton/page";
import Link from "next/link";

const RightSidebar = () => {
  const [users, setUsers] = useState<IUser[]>();

  useEffect(() => {
    getSuggestedPeople();
  }, []);

  const getSuggestedPeople = async () => {
    try {
      const { data } = await axios("/api/friend/suggestedPeople", {
        method: "GET",
      });
      setUsers(data.suggestedPeople);
    } catch (error) {
      console.log("🚀 ~ getSuggestedPeople ~ error:", error);
    }
  };

  return (
    <div className="w-full my-2 h-[calc(100vh-136px)] xl:h-[calc(100vh-88px)] overflow-y-auto no-scrollbar text-primaryText ">
      <div className="">
        <h2 className="text-base text-secondaryText">Group conversations</h2>
        <div className="flex justify-start items-center gap-3 mt-2 hover:bg-[#E4E6E9] px-2 py-2 cursor-pointer rounded-lg  ">
          <div className="p-1 bg-[#D1D5DB] rounded-full  ">
            <IconPlus size={18} />
          </div>
          <h4 className="text-base font-medium  ">Create New Group</h4>
        </div>
        <ul className="mt-2 mr-8">
          {leftSidebarItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-start items-center gap-3 hover:bg-[#E4E6E9] px-2 py-2 cursor-pointer rounded-lg "
            >
              <Image
                src="/asset/images/profile.png"
                alt="user"
                width={35}
                height={35}
              />
              <h4 className="text-base font-medium">Royal Ahmed {index + 1}</h4>
            </li>
          ))}
        </ul>
      </div>
      <hr className="border-gray-500 border-1 my-3 " />
      <div className="">
        <h2 className="text-base text-secondaryText">Suggested people</h2>

        <ul className="mt-3 mr-8">
          {users?.map((user, index) => (
            <li
              key={index}
              className=" flex items-center gap-4 px-2 py-2 cursor-pointer rounded-lg bg-white"
            >
              {/* <Link
                href={`/user/${user._id}`}
                className="flex items-center gap-3 mb-2 hover:bg-[#E4E6E9] p-2 rounded-lg"
              >
              </Link>
              */}
              <div className="">
                <Image src={user.avatar} alt="user" width={40} height={40} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-base">{user.firstName + " " + user.lastName} </h4>
                <p className="text-sm text-secondaryText" >{user.friends.length} friends</p>
              </div>
              {/* <FollowButton user={user} refreshHandler={getSuggestedPeople} /> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
