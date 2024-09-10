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
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import ReactPlayer from "react-player";
import Loader from "../loader";
import { toast } from "react-toastify";
import { CustomToastWithLink } from "../../../utils/customToast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useLoaderStore from "../../../store/loaderStore";
import { RotatingLines } from "react-loader-spinner";
import useUserStore from "../../../store/userStore";
import { IGroup } from "@/types";

const CreatePost = ({ group }: { group?: IGroup }) => {
  // const [loading, setLoading] = useState(false);
  const { loader, setText, setLoader, text } = useLoaderStore();
  const [posting, setPosting] = useState(false);
  const router = useRouter();

  const { user } = useUserStore();

  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
  }, [status]);

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
    setPosting(true);
    setLoader(true);
    setText("Posting");

    try {
      if (createPost.imageError) {
        return;
      }

      let secure_url = null;
      let width = null;
      let height = null;

      // Check if createPost.media exists before making the upload request
      if (createPost.media) {
        const formData = new FormData();
        formData.append("sample_file", createPost.media);

        // Upload the media file
        const { data: m_data } = await axios("api/upload", {
          method: "POST",
          data: formData,
        });

        // Extract width, height, and secure_url from the upload response
        ({ width, height, secure_url } = m_data);
      }

      // Proceed with the createPost API call
      const response = await axios("/api/posts/createPost", {
        method: "POST",
        data: {
          content: createPost.content,
          mediaType: createPost.mediaType,
          media: secure_url, // secure_url will be null if no media is uploaded
          height, // height and width will be null if no media is uploaded
          width,
          groupId: group?._id,
        },
      });

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
      setLoader(false);
      setPosting(false);
      setText("");
    }
  };

  return (
    <>
      {!user ||
        (status === "loading" && <Loader loading={loader} text={text} />)}
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
                  src={user.avatar}
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <h4 className="text-base font-semibold">
                  {user.firstName + " " + user.lastName}
                </h4>
              </Link>
              <div className=" relative ">
                <textarea
                  placeholder={`Whats on your mind ${
                    user.firstName + " " + user.lastName
                  }?`}
                  autoFocus
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
              {posting ? (
                <Button
                  className="bg-primary mt-2 flex justify-center items-center gap-2"
                  fullWidth
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  disabled={true}
                >
                  <RotatingLines
                    visible={true}
                    width="20"
                    strokeWidth="3"
                    animationDuration="1"
                    ariaLabel="rotating-lines-loading"
                    strokeColor="#d9d6f1"
                  />
                  Posting...
                </Button>
              ) : (
                <Button
                  onClick={submitHandler}
                  fullWidth
                  className="bg-primary mt-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  disabled={
                    createPost.media || createPost.content ? false : true
                  }
                >
                  post
                </Button>
              )}
            </div>
          </Modal>
        </>
      )}

      {status === "authenticated" && (
        <div className="bg-white rounded-lg p-2 ">
          <div className="flex justify-start items-center gap-4">
            <Link href={`/user/${user._id}`}>
              <Image
                src={user.avatar}
                alt="user"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
            <input
              type="text"
              name="search"
              id="search"
              autoComplete="none"
              placeholder={`Whats on your mind ${user.firstName} ${user.lastName}`}
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
      )}
    </>
  );
};

export default CreatePost;
