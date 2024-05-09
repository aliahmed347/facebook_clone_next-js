"use client";
import Image from "next/image";
import React from "react";
import { leftSidebarItems } from "../../../utils/leftsidebarItems";

const LeftSidebar = () => {
  return (
    <>
      <div className="w-full my-2  ">
        <div className="flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src="/asset/images/profile.png"
            alt="user"
            width={30}
            height={30}
          />
          <h4 className="text-base font-semibold">Royal Ahmed</h4>
        </div>

        <ul className="mt-3 mr-8">
          {leftSidebarItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-start items-center gap-3 hover:bg-[#E4E6E9] px-2 py-2 cursor-pointer rounded-lg"
            >
              <Image
                src={`/asset/images${item.icon}`}
                alt={item.label}
                width={30}
                height={30}
                className="w-6 h-auto"
              />
              <span className="text-base font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LeftSidebar;
