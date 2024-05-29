"use client";
import Modal from "@/components/Elements/Modal";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import {
  IconLibraryPhoto,
  IconMoodSmile,
  IconPhotoVideo,
  IconX,
} from "@tabler/icons-react";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import ReactPlayer from "react-player";
import Loader from "../loader";
import { toast } from "react-toastify";
import { CustomToastWithLink } from "../../../utils/customToast";

const CreatePost = ({ user }: { user: any }) => {
  const [loading, setLoading] = useState(false);
  const [createPost, setCreatePost] = useState({
    isOpen: false,
    isMedia: false,
    emojiOpen: false,
    content: "",
    media: "",
    mediaType: "text",
    preview: "",
    imageError: "",
  });

  const inputHandler = (e: any) => {
    const { value, name } = e.target;
    setCreatePost((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const imageDropHandler = (acceptedFile: any) => {
    const file = acceptedFile[0];

    if (file.type.startsWith("image")) {
      setCreatePost((prev) => {
        return {
          ...prev,
          imageError: "",
          mediaType: "image",
        };
      });
    } else if (file.type.startsWith("video")) {
      setCreatePost((prev) => {
        return {
          ...prev,
          imageError: "",
          mediaType: "video",
        };
      });
    } else {
      return setCreatePost((prev) => {
        return {
          ...prev,
          imageError: "accept only image or video file",
          mediaType: "text",
        };
      });
    }
    const maxSizeInBytes = 21 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return setCreatePost((prev) => {
        return {
          ...prev,
          imageError: "File Size Exceeds 20MB Limit",
          mediaType: "text",
        };
      });
    }

    setCreatePost((prev) => {
      return {
        ...prev,
        imageError: "",
        media: file,
        preview: URL.createObjectURL(file),
      };
    });
  };
  const closeModalHandler = () => {
    setCreatePost((pre) => {
      return {
        ...pre,
        isOpen: false,
        content: "",
        imageError: "",
        isMedia: false,
        media: "",
        preview: "",
      };
    });
  };
  const submitHandler = async () => {
    setLoading(true);
    try {
      if (createPost.imageError) {
        return;
      }
      const formData = new FormData();

      formData.append("media", createPost.media);
      formData.append("content", createPost.content);
      formData.append("mediaType", createPost.mediaType);

      const response = await axios("api/posts/createPost", {
        method: "POST",
        data: formData,
      });
      console.log("🚀 ~ submitHandler ~ data:", response);
      const { data } = response;
      toast(
        <CustomToastWithLink
          message="Your post is created"
          linkText="View"
          linkUrl={`/post/${data.post._id}`}
        />
      );
      closeModalHandler();
    } catch (error) {
      console.log("🚀 ~ submitHandler ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} text="Posting" />
      {createPost.isOpen && (
        <>
          <Modal>
            <div className=" text-center w-[50wh] ">
              <div className="relative">
                <h2 className="font-semibold text-xl">Create Post</h2>
                <div
                  className="absolute  right-1 top-1 cursor-pointer p-1 bg-backgroundColor rounded-full"
                  onClick={closeModalHandler}
                >
                  <IconX />
                </div>
              </div>
              <hr className="my-4" />
              <Link
                href={`/user/${user._id}`}
                className="flex justify-start items-center gap-3 cursor-pointer my-3"
              >
                <Image
                  src="/asset/images/profile.png"
                  alt="user"
                  width={30}
                  height={30}
                />
                <h4 className="text-base font-semibold">
                  {user.firstName + " " + user.lastName}
                </h4>
              </Link>
              <div className=" relative ">
                <textarea
                  placeholder="Whats on your mind Ali Ahmed?"
                  className="h-40 w-full resize-none outline-none border-primary "
                  onChange={inputHandler}
                  name="content"
                ></textarea>
                <IconMoodSmile
                  className="absolute bottom-2 right-5 cursor-pointer "
                  onClick={() =>
                    setCreatePost((pre) => {
                      return {
                        ...pre,
                        emojiOpen: !pre.emojiOpen,
                      };
                    })
                  }
                />
                {/* <EmojiPicker open={true} className="" /> */}
              </div>
              {createPost.isMedia ? (
                createPost.preview && createPost.media ? (
                  <div>
                    <section className="w-full p-2 border-[1px] border-blue-gray-700 rounded-xl relative ">
                      <div
                        className={`p-1 absolute border-backgroundColor bg-white rounded-full z-auto right-4 top-4 cursor-pointer border-[1px] hover:bg-backgroundColor hover:border-blue-gray-700 hover:border-[1px] h-auto   `}
                      >
                        <IconX
                          className=""
                          onClick={() =>
                            setCreatePost((pre) => {
                              return {
                                ...pre,
                                isMedia: false,
                                preview: "",
                                media: "",
                              };
                            })
                          }
                        />
                      </div>
                      <div
                        className={`bg-backgroundColor  h-auto flex justify-center items-center flex-col rounded-xl hover:bg-[#EAEBED] ${
                          createPost.mediaType === "video" && "mt-11"
                        } `}
                      >
                        {createPost.mediaType === "video" ? (
                          <ReactPlayer
                            url={createPost.preview}
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
                        ) : (
                          <img src={createPost.preview} alt="image" />
                        )}
                      </div>
                    </section>
                  </div>
                ) : (
                  <div className="">
                    <Dropzone onDrop={imageDropHandler} multiple={false}>
                      {({ getRootProps, getInputProps }) => (
                        <section className="w-full p-2 border-[1px] border-blue-gray-700 rounded-xl relative ">
                          <div className="p-1 absolute border-backgroundColor bg-white rounded-full z-auto right-4 top-4 cursor-pointer border-[1px] hover:bg-backgroundColor hover:border-blue-gray-700 hover:border-[1px]  ">
                            <IconX
                              className=""
                              onClick={() =>
                                setCreatePost((pre) => {
                                  return {
                                    ...pre,
                                    isMedia: false,
                                  };
                                })
                              }
                            />
                          </div>
                          <div
                            {...getRootProps()}
                            className="bg-backgroundColor  h-[200px] flex justify-center items-center flex-col rounded-xl hover:bg-[#EAEBED] cursor-pointer "
                          >
                            <input {...getInputProps()} />
                            <IconLibraryPhoto />
                            <p className="font-semibold">Add photo/video</p>
                            <span className="">or drag and drop</span>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                    {createPost.imageError && (
                      <p className="text-sm text-red-400 text-start my-1 ">
                        {createPost.imageError}
                      </p>
                    )}
                  </div>
                )
              ) : (
                <div className="p-2 border-[1px] border-blue-gray-700 rounded-xl flex justify-around ">
                  <p className="font-semibold">Add to your post</p>
                  <div className="">
                    <IconLibraryPhoto
                      size={25}
                      className="text-green-600 cursor-pointer"
                      onClick={() =>
                        setCreatePost((pre) => {
                          return {
                            ...pre,
                            isMedia: true,
                          };
                        })
                      }
                    />
                  </div>
                </div>
              )}
              <Button
                onClick={submitHandler}
                fullWidth
                className="bg-primary mt-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                disabled={createPost.media || createPost.content ? false : true}
              >
                post
              </Button>
            </div>
          </Modal>
        </>
      )}

      <div className="bg-white rounded-lg p-2 ">
        <div className="flex justify-start items-center gap-4">
          <Link href="/">
            <Image
              src="/asset/images/profile.png"
              alt="user"
              width={40}
              height={40}
            />
          </Link>
          <input
            type="text"
            name="search"
            id="search"
            autoComplete="none"
            placeholder="Whats on your mind Ali Ahmed?"
            className="w-full bg-backgroundColor text-primaryText py-[6px] px-3 rounded-full cursor-pointer text-base border-none outline-none "
            onClick={() =>
              setCreatePost((pre) => {
                return {
                  ...pre,
                  isOpen: true,
                };
              })
            }
          />
          <IconPhotoVideo
            size={40}
            className="text-green-500 cursor-pointer"
            onClick={() =>
              setCreatePost((pre) => {
                return {
                  ...pre,
                  isOpen: true,
                };
              })
            }
          />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default CreatePost;
