import { IconPhotoVideo } from "@tabler/icons-react";
import React from "react";

const CreatePostSkelton = () => {
  return (
    <div className="bg-[#E4E6E9] h-12 rounded-lg p-2 ">
      <div className="flex justify-start items-center gap-4">
        <div className="rounded-full bg-gray-500 min-h-7 min-w-7" />
        <input
          type="text"
          name="search"
          id="search"
          autoComplete="none"
          className="w-full bg-gray-500 py-[6px] px-3 rounded-full cursor-pointer text-base border-none outline-none "
        />
        <div className="text-gray-500 bg-gray-500 rounded-full min-w-7 min-h-7 cursor-pointer" />
        {/* </div> */}
      </div>
    </div>
  );
};

export default CreatePostSkelton;
