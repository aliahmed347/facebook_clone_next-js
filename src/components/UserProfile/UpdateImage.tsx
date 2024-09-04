import React, { useState } from "react";
import Modal from "../Elements/Modal";
import { IconLibraryPhoto, IconMoodSmile, IconX } from "@tabler/icons-react";
import Link from "next/link";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { IUser } from "@/types";

interface modalDetails {
  open: boolean;
  name: "profile" | "cover" | "";
}
const UpdateImage = ({
  modalDetails,
  setModalDetails,
  setUser,
}: {
  modalDetails: modalDetails;
  setModalDetails: (modalDetails: modalDetails) => void;
  setUser: (u: IUser) => void;
}) => {
  const [imageDetail, setImageDetail] = useState<{
    media: any;
    preview: string | null;
    imageError: string;
  }>();
  const [uploading, setUploading] = useState(false);
  const imageDropHandler = (acceptedFile: any) => {
    const file = acceptedFile[0];
    if (file.type.startsWith("image")) {
      const maxSizeInBytes = 5 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        return setImageDetail({
          media: null,
          preview: null,
          imageError: "File Size Exceeds 5MB Limit",
        });
      }
      setImageDetail({
        media: file,
        preview: URL.createObjectURL(file),
        imageError: "",
      });
    } else {
      setImageDetail({
        media: null,
        preview: null,
        imageError: "Please Select an Image File",
      });
    }
  };
  const closeModalHandler = () => {
    setImageDetail({
      media: null,
      preview: null,
      imageError: "",
    });
    setModalDetails({ open: false, name: "" });
  };
  const submitHandler = async () => {
    setUploading(true);
    try {
      if (imageDetail?.media === null) return;
      const formData = new FormData();

      formData.append("sample_file", imageDetail?.media);

      const { data: m_data } = await axios("/api/upload", {
        method: "POST",
        data: formData,
      });
      const { secure_url } = m_data;

      const b_data = {} as any;

      if (modalDetails.name === "profile") {
        b_data.avatar = secure_url;
      }

      if (modalDetails.name === "cover") {
        b_data.banner = secure_url;
      }

      const response = await axios("/api/user/updateProfile", {
        method: "POST",
        data: b_data,
      });

      setUser(response.data.user);
      closeModalHandler();
      toast("Image Updated Successfully");
    } catch (error) {
      console.log("🚀 ~ submitHandler ~ error:", error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
      {modalDetails.open && (
        <>
          <Modal
            containerStyle={`${
              modalDetails.name === "profile"
                ? "w-[280px] sm:w-[350px] md:w-[350px] lg:w-[350px]"
                : "w-11/12 sm:w-[680px] md:w-[680px] lg:w-[680px]"
            } flex justify-center items-center`}
          >
            <div className=" text-center w-full ">
              <div className="relative">
                <h2 className="font-semibold text-xl capitalize">
                  Update {modalDetails.name} Image
                </h2>
                <div
                  className="absolute  right-1 top-1 cursor-pointer p-1 bg-backgroundColor rounded-full"
                  onClick={closeModalHandler}
                >
                  <IconX />
                </div>
              </div>
              <hr className="my-4" />

              {imageDetail?.preview && imageDetail?.media ? (
                <div className="flex justify-center items-center">
                  <section
                    className={`${
                      modalDetails.name === "profile"
                        ? "w-[230px] h-[230px] sm:w-[300px] sm:h-[300px]"
                        : "h-[250px] w-full sm:h-[315px] sm:w-[630px]"
                    } p-2 border-[1px] border-blue-gray-700 rounded-xl relative `}
                  >
                    <div
                      className={` p-1 absolute border-backgroundColor bg-white rounded-full z-auto right-4 top-4 cursor-pointer border-[1px] hover:bg-backgroundColor hover:border-blue-gray-700 hover:border-[1px]   `}
                    >
                      <IconX
                        className=""
                        onClick={() =>
                          setImageDetail((pre) => {
                            return {
                              imageError: "",
                              media: null,
                              preview: null,
                            };
                          })
                        }
                      />
                    </div>
                    <div
                      className={`w-full h-full bg-backgroundColor flex justify-center items-center flex-col rounded-xl hover:bg-[#EAEBED]`}
                    >
                      <img
                        src={imageDetail.preview}
                        alt="image"
                        className="h-full w-full"
                      />
                    </div>
                  </section>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center gap-2">
                  <Dropzone onDrop={imageDropHandler} multiple={false}>
                    {({ getRootProps, getInputProps }) => (
                      <section
                        className={`${
                          modalDetails.name === "profile"
                            ? " w-[230px] h-[230px] sm:w-[300px] sm:h-[300px]"
                            : "h-[250px] w-full sm:h-[315px] sm:w-[630px]"
                        } p-2 border-[1px] border-blue-gray-700 rounded-xl relative `}
                      >
                        <div
                          {...getRootProps()}
                          className="bg-backgroundColor w-full h-full flex justify-center items-center flex-col rounded-xl hover:bg-[#EAEBED] cursor-pointer "
                        >
                          <input {...getInputProps()} />
                          <IconLibraryPhoto />
                          <p className="font-semibold">Add photo/video</p>
                          <span className="">or drag and drop</span>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  {imageDetail?.imageError && (
                    <div className="w-full">
                      <p className="text-sm text-red-400 text-start ms-3 ">
                        {imageDetail?.imageError}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {uploading ? (
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
                  Uploading...
                </Button>
              ) : (
                <Button
                  onClick={submitHandler}
                  fullWidth
                  className="bg-primary mt-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  disabled={imageDetail?.media ? false : true}
                >
                  Update
                </Button>
              )}
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default UpdateImage;
