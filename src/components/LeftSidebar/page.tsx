"use client";
import Image from "next/image";
import React from "react";
import { leftSidebarItems } from "../../../utils/leftsidebarItems";
import useLoaderStore from "../../../store/loaderStore";

const LeftSidebar = () => {
  const { sidebar, setSidebar } = useLoaderStore();
  return (
    <>
      <div
        className={`w-1/2 lg:w-1/4 h-full p-4 left-0 -top-2 -bottom-0  lg:block  absolute lg:relative bg-backgroundColor lg:bg-transparent ${
          !sidebar && "hidden"
        } `}
      >
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
      </div>
    </>
  );
};

export default LeftSidebar;
