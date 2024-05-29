import React, { useEffect, useState } from "react";
import Post from "../Post/page";
import axios from "axios";

const PostsList = () => {
  const [Posts, setPosts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const res = await axios("api/posts/getAllPosts", {
        method: "POST",
      });
      setPosts(res.data.posts);
    } catch (error) {
      console.log("🚀 ~ getAllPosts ~ error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full  mt-3 flex justify-center items-center gap-3 flex-col  ">
      {!loading &&
        Posts.map((post: any, index) => <Post key={index} post={post} />)}
    </div>
  );
};

export default PostsList;
