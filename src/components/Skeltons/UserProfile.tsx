import { Button } from "@material-tailwind/react";
import { IconPhotoVideo } from "@tabler/icons-react";
import React from "react";

const UserProfileSkelton = () => {
  return (
    <div className="w-full relative mb-3">
      <div className={`relative w-full h-56 rounded-xl bg-gray-500 `}>
        <div className="w-24 h-24 absolute left-4 -bottom-12  rounded-full  border-4 border-gray-500 bg-gray-500 ">
          {/* {user.email === data?.user?.email && ( */}
          <button className="absolute right-1 bottom-1 text-gray-500 bg-gray-500 rounded-full p-2 shadow-md translate-x-1/4 translate-y-1/4">
            sa
            {/* <FaCamera className="text-gray-500" /> */}
          </button>
          {/* )} */}
        </div>
        {/* {user.email === data?.user?.email && ( */}
        <button className="absolute right-2 bottom-2 text-gray-500 bg-gray-500 rounded-full p-2 shadow-md">
          {/* <FaCamera className="text-gray-500" /> */}
          sad
        </button>
        {/* )} */}
      </div>

      <div className="mt-14 px-2 flex justify-between items-center ">
        <div className="w-[70%]">
          <h2 className="text-xl font-semibold bg-gray-500 text-gray-500 h-4 w-40 rounded-lg ">
            {/* {user.firstName + " " + user.lastName} */}
            {/* asd */}
          </h2>
          <p
            className="bg-gray-500 text-gray-500  h-3 w-32 mt-3 rounded-lg"
          >
            {/* <span>0 w-3 h-10</span> friends */}
          </p>
        </div>
        {/* {user.email === data?.user?.email && ( */}
        <Button
          className="bg-gray-500 text-gray-500 flex justify-center items-center gap-2"
          fullWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {/* <FaRegEdit className="" size={20} /> */}
          Update
        </Button>
        {/* )} */}
      </div>
    </div>
  );
};

export default UserProfileSkelton;
