// "use client";
import {
  IconH1,
  IconHeart,
  IconHeartFilled,
  IconMessageCircle2,
  IconMessageReply,
  IconSend,
  IconShare3,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BiLike } from "react-icons/bi";
import ReactPlayer from "react-player";

const Post = ({ myPost }: any) => {
  const [post, setPost] = useState<any>(myPost);
  const [comment, setComment] = useState<string>("");
  const [commentOpen, setCommentOpen] = useState(false);
  const { author } = post;
  const { data }: any = useSession();

  const textareaRef: any = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      adjustHeight();
      textarea.addEventListener("input", adjustHeight);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("input", adjustHeight);
      }
    };
  }, []);

  const likePostHandler = async (id: string) => {
    try {
      const res = await axios(
        post.likes.includes(data?.user?._id)
          ? "api/posts/dislikePost"
          : "api/posts/likePost",
        {
          method: "POST",
          data: { postId: id },
        }
      );

      setPost(res.data.post);
    } catch (error) {
      console.log("🚀 ~ likePostHandler ~ error:", error);
    }
  };
  const CommentHandler = async (id: string) => {
    try {
      const res = await axios("api/posts/comment/commentOnPost", {
        method: "POST",
        data: {
          post: id,
          // commentId: "66689626e4976115f69c0d4e",
          content: comment,
          author: data?.user?._id,
        },
      });

      setPost((prev: any) => {
        return {
          ...prev,
          comments: res.data.comments,
        };
      });
    } catch (error) {
      console.log("🚀 ~ likePostHandler ~ error:", error);
    }
  };
  const CommentLikeHandler = async (id: string, commentId: string) => {
    try {
      const res = await axios("api/posts/comment/likeOnComment", {
        method: "POST",
        data: {
          post: id,
          commentId,
          author: data?.user?._id,
        },
      });

      setPost((prev: any) => {
        return {
          ...prev,
          comments: res.data.comments,
        };
      });
    } catch (error) {
      console.log("🚀 ~ likePostHandler ~ error:", error);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl ">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-1 p-2 ">
          <Image
            src={author.avatar}
            alt="user"
            width={35}
            height={35}
            className="cursor-pointer"
          />
          <div className="">
            <h4 className="text-sm font-medium cursor-pointer  hover:underline ">
              {author.firstName + " " + author.lastName}
            </h4>
            <p className="text-xs text-secondaryText ">
              {formatDistanceToNowStrict(new Date(post.createdAt))}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`w-full p-2 ${
          post.mediaType === "text" ? "text-center" : ""
        }  `}
      >
        <p
          className={`${
            post.mediaType === "text" && post.content.length <= 360
              ? "text-xl"
              : ""
          }  `}
        >
          {post.content}
        </p>
      </div>
      <div className="w-full">
        {post.mediaType === "image" && (
          <img src={post.media} className="w-full h-auto" />
        )}
        {post.mediaType === "video" && (
          // <img src={post.media} className="w-full h-auto" />
          <ReactPlayer
            url={post.media}
            playing={false}
            controls={true}
            config={{
              file: {
                forceVideo: true,
              },
            }}
            style={{}}
            width="100%"
            height="100%"
          />
        )}
      </div>
      <div className="w-full p-3 flex justify-between text-secondaryText  text-xs ">
        <p>{post.likes.length} Likes</p>
        <div className="flex gap-2">
          <p>{post.comments.length} Comments</p>
          <p>23 Share</p>
        </div>
      </div>
      <hr />
      <div className="w-full p-2 flex justify-around text-secondaryText gap-1  ">
        <div
          className={`w-1/3 py-1 hover:bg-backgroundColor flex justify-center items-center gap-2 rounded-md cursor-pointer ${
            post.likes.includes(data?.user?._id) && "text-primary"
          }   `}
          onClick={() => likePostHandler(post._id)}
        >
          {post.likes.includes(data?.user?._id) ? (
            <IconThumbUpFilled />
          ) : (
            <IconThumbUp />
          )}
          <p className="text-sm select-none">Like</p>
        </div>
        <div
          className="w-1/3 py-1 hover:bg-backgroundColor flex justify-center items-center gap-2 rounded-md cursor-pointer"
          onClick={() => setCommentOpen(!commentOpen)}
        >
          <IconMessageCircle2 />
          <p className="text-sm select-none">Comment</p>
        </div>
        <div className="w-1/3 py-1 hover:bg-backgroundColor flex justify-center items-center gap-2 rounded-md cursor-pointer">
          <IconShare3 />
          <p className="text-sm select-none">Share</p>
        </div>
      </div>
      <hr className="mb-3" />
      {commentOpen && (
        <>
          <div className="w-full px-4 flex gap-2 flex-col">
            {post.comments.map(
              (comment: {
                _id: string;
                author: { firstName: string; lastName: string; avatar: string };
                content: string;
                likes: any[];
              }) => {
                return (
                  <div className="bg-backgroundColor rounded-lg p-2 w-full">
                    <div className="w-full flex items-center gap-1">
                      <Image
                        alt="user"
                        src={comment?.author?.avatar}
                        width={20}
                        height={20}
                      />
                      <p className="text-xs font-extralight cursor-pointer hover:underline">
                        {comment?.author?.firstName +
                          " " +
                          comment?.author?.lastName}
                      </p>
                    </div>
                    <div className=" w-full flex justify-between">
                      <p className="text-sm font-normal mt-1">
                        {comment.content}
                      </p>
                    </div>
                    <div className="w-full flex justify-end items-end  gap-4 ">
                      <div className="flex justify-center items-center gap-1">
                        {comment?.likes?.includes(data?.user?._id) ? (
                          <IconHeartFilled
                            size={15}
                            className="cursor-pointer text-primary"
                            onClick={() =>
                              CommentLikeHandler(post?._id, comment?._id)
                            }
                          />
                        ) : (
                          <IconHeart
                            size={15}
                            className="cursor-pointer"
                            onClick={() =>
                              CommentLikeHandler(post?._id, comment?._id)
                            }
                          />
                        )}
                        <p className="text-[10px] font-thin mt-1">
                          {comment?.likes?.length}
                        </p>
                      </div>
                      <div className="flex justify-center items-center gap-1">
                        <IconMessageReply size={15} />
                        <p className="text-[10px] font-thin mt-1">
                          {comment?.likes?.length}
                        </p>
                      </div>
                    </div>

                    {/* <div className="flex"></div> */}
                  </div>
                );
              }
            )}
          </div>
          <div className="w-full p-2   ">
            <div className="w-full flex justify-between gap-2  ">
              <Image
                src={data?.user?.avatar}
                alt="user"
                width={35}
                height={35}
                className="cursor-pointer w-[35px] h-[35px]"
              />
              <div className="bg-backgroundColor w-full rounded-xl p-1">
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  ref={textareaRef}
                  placeholder="Write a comment..."
                  className=" w-full p-2 text-sm resize-none overflow-hidden border-0 outline-none rounded-t-xl "
                ></textarea>
                {comment && (
                  <div className="float-right flex w-full justify-end items-center   ">
                    <button
                      className="flex items-center justify-center gap-1 cursor-pointer"
                      type="button"
                      onClick={() => comment && CommentHandler(post._id)}
                    >
                      Send
                      <IconSend className="" size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* <div className="w-full flex justify-end items-center px-2 py-1">
          <IconSend className="cursor-pointer" />
        </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
