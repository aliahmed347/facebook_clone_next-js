import Image from "next/image";
import React from "react";
import FollowButton from "../FollowButton/page";
import { Button } from "@material-tailwind/react";

const FriendsSkelton = () => {
  return (
    <>
      <div className="w-full">
        <h1 className="text-xl font-bold bg-gray-500 h-5 w-40 rounded-md"></h1>
      </div>
      <div className="w-full mt-3">
        <h1 className="text-xl font-medium mt-1 bg-gray-500 h-3 w-32 my-3 rounded-md"></h1>
        {[1, 2, 3, 4, 5].map(() => {
          return (
            <>
              <div className="w-full bg-gray-400 flex items-start p-4 gap-5 rounded-xl mt-2">
                <div className="w-16 h-16 bg-gray-500 rounded-full "></div>
                <div className="">
                  <h1 className="text-lg font-medium bg-gray-500 h-3 w-28 mb-2"></h1>
                  <Button
                    className="bg-gray-500 text-gray-500 flex justify-center items-center gap-2"
                    fullWidth
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    sad
                  </Button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default FriendsSkelton;
