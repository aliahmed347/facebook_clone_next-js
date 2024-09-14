"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { leftSidebarItems } from "../../../utils/leftsidebarItems";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { IGroup, IUser } from "@/types";
import Link from "next/link";
import CreateGroup from "../Group/Create";

const RightSidebarSkelton = () => {
  const [users, setUsers] = useState<IUser[]>();
  const [groups, setGroups] = useState<IGroup[]>();

  return (
    <>
      <>
        <div className="">
          <h2 className="w-32 h-4 rounded-lg bg-gray-500"></h2>
          <div className="flex justify-start items-center gap-3 mt-2 bg-[#E4E6E9] px-2 py-2 cursor-pointer rounded-lg  ">
            <div className="p-1 bg-gray-500 w-5 h-5 rounded-full  ">
              {/* <IconPlus size={18} /> */}
            </div>
            <h4 className="text-base font-medium  whitespace-nowrap w-28 h-4 bg-gray-500 rounded-lg"></h4>
          </div>
          <ul className="mt-2 mr-8">
            {Array.from({ length: 3 }).map((group, index) => (
              <div
                key={index}
                className="flex justify-start items-center gap-3 bg-[#E4E6E9] px-2 py-2 my-1 cursor-pointer rounded-lg "
              >
                <div className="w-9 h-9 bg-gray-500 rounded-full"></div>
                <h4 className="text-base font-medium whitespace-nowrap w-28 h-3 rounded-lg bg-gray-500"></h4>
              </div>
            ))}
          </ul>
        </div>
        <hr className="border-gray-500 border-1 my-3 " />
        <div className="">
          <h2 className="text-base text-secondaryText whitespace-nowrap w-32 h-4 bg-gray-500 rounded-lg"></h2>

          <ul className="mt-3 mr-8">
            {Array.from({ length: 4 })?.map((user, index) => (
              <div
                key={index}
                className=" flex items-center gap-4 px-2 py-2 mt-1 cursor-pointer rounded-lg bg-[#E4E6E9]"
              >
                <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
                <div className="flex flex-col">
                  <h4 className="text-base whitespace-nowrap w-32 h-3 bg-gray-500 rounded-lg"></h4>
                  <p className="text-sm text-secondaryText whitespace-nowrap w-28 h-3 m-1 rounded-lg bg-gray-500 "></p>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </>
    </>
  );
};

export default RightSidebarSkelton;
