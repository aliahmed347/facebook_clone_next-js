"use client";
import React, { useEffect, useState } from "react";
import { IGroup, IUser } from "../../types";
import Modal from "../Elements/Modal";
import { IconX } from "@tabler/icons-react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Input,
  Radio,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

interface modalDetails {
  open: boolean;
}
const UpdateGroup = ({
  modalDetails,
  setModalDetails,
  setGroup,
  group,
}: {
  modalDetails: modalDetails;
  setModalDetails: (modalDetails: modalDetails) => void;
  setGroup: (u: IGroup) => void;
  group: IGroup;
}) => {
  const [error, setError] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const validationSchema = yup.object({
    name: yup.string().required("Group name is require"),
    description: yup.string().required("Description name is require"),
  });

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    handleBlur,
    resetForm,
    setValues,
  } = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      name: group.name,
      description: group.description,
    },
    onSubmit: (values): any => {
      const updatedUser = async () => {
        setUploading(true);

        try {
          const response = await axios("/api/group/updateProfile", {
            method: "POST",
            data: { ...values, groupId: group._id },
          });
          setGroup(response.data.group);
          closeModalHandler();
          toast("Profile Updated Successfully", { type: "success" });
        } catch (error) {
          console.log("🚀 ~ updatedUser ~ error:", error);
        } finally {
          setUploading(false);
          resetForm();
        }
      };
      updatedUser();
    },
  });

  useEffect(() => {
    setValues({
      description: group.description,
      name: group.name,
    });
  }, [group, setValues]);

  const closeModalHandler = () => {
    setModalDetails({ open: false });
    resetForm();
  };

  return (
    <>
      {modalDetails.open && (
        <Modal>
          <div className="">
            <div className=" text-center w-full ">
              <div className="relative">
                <h2 className="font-semibold text-xl capitalize">
                  Update Group
                </h2>
                <div
                  className="absolute  right-1 top-1 cursor-pointer p-1 bg-backgroundColor rounded-full"
                  onClick={closeModalHandler}
                >
                  <IconX />
                </div>
              </div>
              <hr className="my-4" />
              <div className="">
                <form
                  className="mt-8 mb-2   w-full  max-w-screen-lg xl:max-w-screen-xl "
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  {error && (
                    <div className="relative block w-full py-2 px-4 mb-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
                      {error}
                    </div>
                  )}
                  <div className="mb-3">
                    <Input
                      size="lg"
                      name="name"
                      placeholder="Group Name"
                      className=""
                      label="Name"
                      labelProps={{
                        className: "",
                      }}
                      onChange={handleChange}
                      value={values.name}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                    />
                  </div>

                  <Textarea
                    name="description"
                    size="lg"
                    // placeholder="Enter your bio"
                    style={{}}
                    className=""
                    label="Enter your description"
                    labelProps={{
                      className: "",
                    }}
                    onChange={handleChange}
                    value={values.description}
                    error={errors.description ? true : false}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />

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
                      // onClick={() => handleSubmit()}
                      type="submit"
                      fullWidth
                      className="bg-primary mt-2"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      // disabled={errors ? false : true}
                    >
                      Update
                    </Button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UpdateGroup;
