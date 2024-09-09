"use client";
import React, { useState } from "react";
import Modal from "../Elements/Modal";
import { IconX } from "@tabler/icons-react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { RotatingLines } from "react-loader-spinner";
import { CustomToastWithLink } from "../../../utils/customToast";
interface modalDetails {
  open: boolean;
}
const CreateGroup = ({
  modalDetails,
  setModalDetails,
  handelRefresh
}: {
  modalDetails: modalDetails;
  setModalDetails: (modalDetails: modalDetails) => void;
  handelRefresh: () => void;
}) => {
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
      name: "",
      description: "",
    },
    onSubmit: (values): any => {
      const createGroup = async () => {
        setUploading(true);

        try {
          const response = await axios("/api/group/create", {
            method: "POST",
            data: values,
          });
          // setUser(response.data.user);
          closeModalHandler();
          handelRefresh()
          toast(
            <CustomToastWithLink
              message="Group created successfully"
              linkText="View"
              linkUrl={`/group/${response.data.group._id}`}
            />
          );
        } catch (error) {
          console.log("🚀 ~ createGroup ~ error:", error);
        } finally {
          setUploading(false);
          resetForm();
        }
      };
      createGroup();
    },
  });

  const closeModalHandler = () => {
    setModalDetails({ open: false });
  };
  return (
    <>
      {modalDetails.open && (
        <Modal>
          <div className="">
            <div className=" text-center w-full ">
              <div className="relative">
                <h2 className="font-semibold text-xl capitalize">
                  Create Group
                </h2>
                <div
                  className="absolute  right-1 top-1 cursor-pointer p-1 bg-backgroundColor rounded-full"
                  onClick={closeModalHandler}
                >
                  <IconX />
                </div>
              </div>
              <hr className="my-4" />
              <form
                className="mt-8 mb-2   w-full  max-w-screen-lg xl:max-w-screen-xl "
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
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
                    Creating...
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
                    Create
                  </Button>
                )}
              </form>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CreateGroup;
