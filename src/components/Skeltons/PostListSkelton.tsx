import React from "react";

const PostListSkelton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return (
          <>
            <div className="w-full bg-white rounded-xl  ">
              <div className="flex justify-between items-center gap-3 w-full p-2 ">
                <div className="w-12 h-12 rounded-full bg-gray-500 "></div>
                <div className=" bg-gray-500 h-12 w-full rounded-lg "></div>
              </div>
              <div className="w-full p-2">
                {/* <div className={`w-full p-2  bg-gray-500 mt-2 h-6  `}></div> */}
                <div className="w-full flex justify-between text-secondaryText  text-xs bg-gray-500 h-[280px] rounded-lg "></div>
              </div>
              <hr />
              <div className="w-full p-2 flex justify-around text-secondaryText gap-1  ">
                <div className="w-1/3 py-1 bg-gray-500 h-9 flex justify-center items-center gap-2 rounded-md "></div>
                <div className="w-1/3 py-1 bg-gray-500 h-9 flex justify-center items-center gap-2 rounded-md"></div>
                <div className="w-1/3 py-1 bg-gray-500 h-9 flex justify-center items-center gap-2 rounded-md"></div>
              </div>
              <hr className="mb-3" />
            </div>
          </>
        );
      })}
    </>
  );
};

export default PostListSkelton;
