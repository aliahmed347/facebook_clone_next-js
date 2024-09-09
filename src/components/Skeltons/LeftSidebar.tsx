import React, { useState } from "react";
import useLoaderStore from "../../../store/loaderStore";
import Image from "next/image";
import { leftSidebarItems } from "../../../utils/leftsidebarItems";

const LeftSidebarSkelton = () => {
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
            <div className="w-10 h-10 rounded-full bg-gray-500"></div>
            <h4 className="text-base font-semibold bg-gray-500 h-4 w-32 rounded-lg "></h4>
          </div>

          <ul className="mt-3 mr-8">
            {leftSidebarItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-start items-center gap-3 bg-[#E4E6E9] px-2 py-2 cursor-pointer rounded-lg mb-2"
              >
                <div className="w-7 h-7 rounded-xl bg-gray-500"></div>
                <span className="text-base font-medium bg-gray-500 w-28 h-3 rounded-md"></span>
              </li>
            ))}
          </ul>
          <div className="w-full mt-3">
            <h3 className="text-lg font-semibold h-3 w-28 rounded-xl bg-gray-500"></h3>
            <ul className="mt-3 mr-8">
              {leftSidebarItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-start items-center gap-3 bg-[#E4E6E9] px-2 py-2 cursor-pointer rounded-lg mb-2"
                >
                  <div className="w-7 h-7 rounded-xl bg-gray-500"></div>
                  <span className="text-base font-medium bg-gray-500 w-28 h-3 rounded-md"></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebarSkelton;
