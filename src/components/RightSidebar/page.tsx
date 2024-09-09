"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { leftSidebarItems } from "../../../utils/leftsidebarItems";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { IGroup, IUser } from "@/types";
import Link from "next/link";
import CreateGroup from "../Group/Create";

const RightSidebar = () => {
  const [users, setUsers] = useState<IUser[]>();
  const [groups, setGroups] = useState<IGroup[]>();

  const [groupModal, setGroupModal] = useState<{
    open: boolean;
  }>({ open: false });

  useEffect(() => {
    getSuggestedPeopleAndGroup();
  }, []);

  const getSuggestedPeopleAndGroup = async () => {
    try {
      const { data } = await axios("/api/friend/suggestedPeopleAndGroup", {
        method: "GET",
      });
      setUsers(data.suggestedPeople);
      setGroups(data.suggestedGroup);
    } catch (error) {
      console.log("🚀 ~ getSuggestedPeopleAndGroup ~ error:", error);
    }
  };

  return (
    <>
      <CreateGroup
        modalDetails={groupModal}
        setModalDetails={setGroupModal}
        handelRefresh={getSuggestedPeopleAndGroup}
      />
      <div className="w-full my-2 h-[calc(100vh-136px)] xl:h-[calc(100vh-88px)] overflow-y-auto no-scrollbar text-primaryText ">
        <div className="">
          <h2 className="text-base text-secondaryText">Group conversations</h2>
          <div
            className="flex justify-start items-center gap-3 mt-2 hover:bg-[#E4E6E9] px-2 py-2 cursor-pointer rounded-lg  "
            onClick={() => setGroupModal({ open: true })}
          >
            <div className="p-1 bg-[#D1D5DB] rounded-full  ">
              <IconPlus size={18} />
            </div>
            <h4 className="text-base font-medium  ">Create New Group</h4>
          </div>
          <ul className="mt-2 mr-8">
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
          </ul>
        </div>
        <hr className="border-gray-500 border-1 my-3 " />
        <div className="">
          <h2 className="text-base text-secondaryText">Suggested people</h2>

          <ul className="mt-3 mr-8">
            {users?.map((user, index) => (
              <Link
                href={`/user/${user._id}`}
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
                  <Image
                    src={user.avatar}
                    alt="user"
                    width={40}
                    height={40}
                    className="border border-secondaryText rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-base">
                    {user.firstName + " " + user.lastName}{" "}
                  </h4>
                  <p className="text-sm text-secondaryText">
                    {user.friends.length} friends
                  </p>
                </div>
                {/* <FollowButton user={user} refreshHandler={getSuggestedPeople} /> */}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
