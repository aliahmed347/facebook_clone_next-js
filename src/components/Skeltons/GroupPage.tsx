import Image from "next/image";
import React from "react";
import FollowButton from "../FollowButton/page";
import { Button } from "@material-tailwind/react";
import PostListSkelton from "./PostListSkelton";

const GroupPageSkelton = () => {
  return (
    <>
      <div className="w-full mb-3">
        <h1 className="text-xl font-medium mt-1 h-5 w-28 bg-gray-500 rounded-lg"></h1>
      </div>
      <div className="max-w-full overflow-x-auto flex gap-2 no-scrollbar">
        <div className="flex gap-2 w-max no-scrollbar">
          {Array.from({ length: 20 }).map((_, index) => {
            return (
              <div
                key={index} // Unique key for each item
                // href={`/group/${group._id}`}
                className="rounded-lg w-24 h-32 flex-shrink-0 flex flex-col justify-center items-center p-2 bg-gray-200"
              >
                <div className="rounded-full w-[70px] h-[70px] bg-gray-500" />
                <h4 className="text-base font-semibold bg-gray-500 w-full mt-3  h-3 rounded-lg"></h4>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3">
        <h1 className="text-xl font-medium mt-1 h-5 w-28 bg-gray-500 rounded-lg"></h1>
        <PostListSkelton />
      </div>
    </>
  );
};

export default GroupPageSkelton;
