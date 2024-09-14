"use client";
import React, { useEffect, useState } from "react";
import { IUser } from "../../types";
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
const UpdateUser = ({
  modalDetails,
  setModalDetails,
  setUser,
  user,
}: {
  modalDetails: modalDetails;
  setModalDetails: (modalDetails: modalDetails) => void;
  setUser: (u: IUser) => void;
  user: IUser;
}) => {
  const [error, setError] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const validationSchema = yup.object({
    firstName: yup.string().required("First name is require"),
    lastName: yup.string().required("Last name is require"),
    username: yup.string().required("Username is require"),
    email: yup
      .string()
      .email("Enter invalid email")
      .required("Email is require"),
    // password: yup.string().min(8, "min").required("password is require"),
    DOB: yup.date().required("please select your date of birth"),
    bio: yup.string(),
  });
  const dob = new Date(user.DOB);
  const formattedDOB = `${dob.getFullYear()}-${(dob.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dob.getDate().toString().padStart(2, "0")}`;

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
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username || "",
      gender: user.gender,
      DOB: formattedDOB,
      bio: user.bio,
    },
    onSubmit: (values): any => {
      const updatedUser = async () => {
        setUploading(true);

        try {
          const response = await axios("/api/user/updateProfile", {
            method: "POST",
            data: values,
          });
          setUser(response.data.user);
          closeModalHandler();
          toast("Profile Updated Successfully", { type: "success" });
        } catch (error: any) {
          console.log("🚀 ~ updatedUser ~ error:", error);
          toast(`${error?.response?.data?.error}`, { type: "error" });
        } finally {
          setUploading(false);
          resetForm();
        }
      };
      updatedUser();
    },
  });

  useEffect(() => {
    const dob = new Date(user.DOB);
    const formattedDOB = `${dob.getFullYear()}-${(dob.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dob.getDate().toString().padStart(2, "0")}`;

    setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username || "",
      email: user.email,
      gender: user.gender,
      DOB: formattedDOB,
      bio: user.bio,
    });
  }, [user, setValues]);

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
                  Update Profile
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
                  <div className="mb-1 flex flex-col gap-6 w-full ">
                    <div className="w-full flex flex-col sm:flex-row gap-y-5 gap-x-2 ">
                      <Input
                        size="lg"
                        name="firstName"
                        placeholder="John"
                        // className="w-full"
                        width="50%"
                        label="First Name"
                        labelProps={{
                          className: "",
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        error={errors.firstName ? true : false}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                      />

                      <Input
                        size="lg"
                        name="lastName"
                        placeholder="Dou"
                        // className="w-full"
                        width="50%"
                        label="Last Name"
                        labelProps={{
                          className: "",
                        }}
                        onChange={handleChange}
                        value={values.lastName}
                        error={errors.lastName ? true : false}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                      />
                    </div>

                    <Input
                      size="lg"
                      name="email"
                      placeholder="name@mail.com"
                      className=""
                      label="Email"
                      labelProps={{
                        className: "",
                      }}
                      onChange={handleChange}
                      value={values.email}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                      disabled={true}
                    />
                    <Input
                      size="lg"
                      name="username"
                      placeholder="Jhon dou"
                      className=""
                      label="Username"
                      labelProps={{
                        className: "",
                      }}
                      onChange={handleChange}
                      value={values.username}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                    />

                    <Input
                      type="date"
                      name="DOB"
                      size="lg"
                      placeholder="Date of birth"
                      // style={{}}
                      className=""
                      label="Date of birth"
                      labelProps={{
                        className: "",
                      }}
                      onChange={handleChange}
                      value={values.DOB}
                      error={errors.DOB ? true : false}
                      crossOrigin={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />

                    <div className="flex flex-wrap justify-center gap-y-1 gap-x-2 ">
                      <Radio
                        name="gender"
                        label="Male"
                        value="male"
                        onChange={handleChange}
                        defaultChecked
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                      />
                      <Radio
                        name="gender"
                        label="Female"
                        value="female"
                        onChange={handleChange}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                      />
                      <Radio
                        name="gender"
                        label="Custom"
                        value="custom"
                        onChange={handleChange}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                      />
                    </div>
                  </div>

                  <Textarea
                    name="bio"
                    size="lg"
                    // placeholder="Enter your bio"
                    style={{}}
                    className=""
                    label="Enter your bio"
                    labelProps={{
                      className: "",
                    }}
                    onChange={handleChange}
                    value={values.bio}
                    error={errors.bio ? true : false}
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

export default UpdateUser;
