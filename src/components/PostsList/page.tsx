import React, { useEffect, useState } from "react";
import Post from "../Post/page";
import axios from "axios";
import PostListSkelton from "../Skeltons/PostListSkelton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PostsList = () => {
  const [Posts, setPosts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [user, setUser] = useState<any>({});
  const router = useRouter();

  const { data, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
    if (data?.user) {
      setUser(data?.user);
    }
  }, [data, status]);
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
      {!loading ? (
        Posts.map((post: any, index) => <Post key={index} myPost={post} />)
      ) : (
        <PostListSkelton />
      )}
    </div>
  );
};

export default PostsList;
