import React from "react";
import Post from "../Post/page";

const PostsList = () => {
  return (
    <div className="w-full  mt-3 flex justify-center items-center gap-3 flex-col  ">
      <Post />
      <Post />
    </div>
  );
};

export default PostsList;
