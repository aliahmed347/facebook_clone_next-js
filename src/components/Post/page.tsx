// "use client";
import {
  IconMessageCircle2,
  IconShare3,
  IconThumbUp,
} from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { BiLike } from "react-icons/bi";

const Post = () => {
  return (
    <div className="w-full bg-white rounded-xl ">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-1 p-2 ">
          <Image
            src="/asset/images/profile.png"
            alt="user"
            width={35}
            height={35}
            className="cursor-pointer"
          />
          <div className="">
            <h4 className="text-sm font-medium cursor-pointer  hover:underline ">
              Royal Ahmed
            </h4>
            <p className="text-xs text-secondaryText ">
              {new Date().toISOString().slice(0, 10)}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <img
          src="asset/uploads/posts_media/postpic3.jpg"
          className="w-full h-auto"
        />
      </div>
      <div className="w-full p-3 flex justify-between text-secondaryText  text-xs ">
        <p>23 Likes</p>
        <div className="flex gap-2">
          <p>23 Comments</p>
          <p>23 Share</p>
        </div>
      </div>
      <hr />
      <div className="w-full p-2 flex justify-around text-secondaryText gap-1  ">
        <div className="w-1/3 py-1 hover:bg-backgroundColor flex justify-center items-center gap-2 rounded-md cursor-pointer ">
          <IconThumbUp />
          <p className="text-sm">Like</p>
        </div>
        <div className="w-1/3 py-1 hover:bg-backgroundColor flex justify-center items-center gap-2 rounded-md cursor-pointer">
          <IconMessageCircle2 />
          <p className="text-sm">Comment</p>
        </div>
        <div className="w-1/3 py-1 hover:bg-backgroundColor flex justify-center items-center gap-2 rounded-md cursor-pointer">
          <IconShare3 />
          <p className="text-sm">Share</p>
        </div>
      </div>
      <hr className="mb-3" />
    </div>
  );
};

export default Post;
