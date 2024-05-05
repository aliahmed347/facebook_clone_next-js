"use client";
import Modal from "@/components/Elements/Modal";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import { IconLibraryPhoto, IconPhotoVideo, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

const CreatePost = () => {
  const [createPost, setCreatePost] = useState({
    isOpen: false,
    isMedia: false,
  });
  return (
    <>
      {createPost.isOpen && (
        <>
          <Modal>
            <div className=" text-center w-[50wh] ">
              <div className="relative">
                <h2 className="font-semibold text-xl">Create Post</h2>
                <div
                  className="absolute  right-1 top-1 cursor-pointer p-1 bg-backgroundColor rounded-full"
                  onClick={() =>
                    setCreatePost((pre) => {
                      return {
                        ...pre,
                        isOpen: false,
                      };
                    })
                  }
                >
                  <IconX />
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-start items-center gap-3 cursor-pointer my-3">
                <Image
                  src="/asset/images/profile.png"
                  alt="user"
                  width={30}
                  height={30}
                />
                <h4 className="text-base font-semibold">Royal Ahmed</h4>
              </div>

              <textarea
                placeholder="Whats on your mind Ali Ahmed?"
                className=" h-40 w-full resize-none outline-none border-primary "
              ></textarea>
              {createPost.isMedia ? (
                <div className="">
                  <Dropzone
                    onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                  >
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
                </div>
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
              <Button fullWidth className="bg-primary mt-2">
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
