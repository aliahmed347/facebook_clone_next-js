"use client";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Radio,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import axios from "axios";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as yup from "yup";
import { sendMail } from "../../../../lib/sendMail";

const Register = () => {
  const [step, setStep] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const validationSchema = yup.object({
    first_name: yup.string().required("First name is require"),
    last_name: yup.string().required("Last name is require"),
    email: yup
      .string()
      .email("Enter invalid email")
      .required("Email is require"),
    password: yup.string().min(8, "min").required("password is require"),
    DOB: yup.date().required("please select your date of birth"),
  });

  const { handleChange, handleSubmit, values, errors, handleBlur } = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      gender: "male",
      DOB: "",
    },
    onSubmit: (values) => {
      // console.log("🚀 ~ Register ~ values:", values);

      const createUser = async () => {
        try {
          const user = await axios({
            url: "api/auth/register/createAccount",
            method: "POST",
            data: values,
          });
          console.log("🚀 ~ createUser ~ user:", user.data);
          router.push("/login");
        } catch (error) {
          console.log("🚀 ~ createUser ~ error:", error);
        }
      };
      createUser();
      // sendMail();

      // setStep(1);
    },
  });

  return (
    <section className="w-full min-h-screen flex gap-3 lg:gap-0 flex-col lg:flex-row justify-evenly items-center p-5 md:p-10 ">
      <div className=" w-full lg:w-1/2 flex md:p-6 flex-col justify-start items-start">
        <Image
          src="asset/images/facebook_logo.svg"
          alt="logo"
          width={50}
          height={50}
          className="w-[auto] h-[106px] "
        />
        <h2 className="  text-xl md:text-2xl lg:text-3xl font-normal ml-6 ">
          Facebook helps you connect and share with the people in your life.
        </h2>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        {step === 0 && (
          <Card
            className="shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] w-full px-5 bg-white rounded-xl "
            color="transparent"
            shadow={true}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <form
              className="mt-8 mb-2   w-full  max-w-screen-lg xl:max-w-screen-xl "
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {/* <div className="relative block w-full p-4 mb-4 text-base leading-5 text-white bg-green-400 rounded-lg opacity-100 font-regular"></div > */}
              <div className="mb-1 flex flex-col gap-6 w-full ">
                <div className="w-full flex flex-col sm:flex-row gap-y-5 gap-x-2 ">
                  <Input
                    size="lg"
                    name="first_name"
                    placeholder="John"
                    // className="w-full"
                    width="50%"
                    label="First Name"
                    labelProps={{
                      className: "",
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                    error={errors.first_name ? true : false}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}
                  />

                  <Input
                    size="lg"
                    name="last_name"
                    placeholder="Dou"
                    // className="w-full"
                    width="50%"
                    label="Last Name"
                    labelProps={{
                      className: "",
                    }}
                    onChange={handleChange}
                    value={values.last_name}
                    error={errors.last_name ? true : false}
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
                  error={errors.email ? true : false}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />

                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  size="lg"
                  placeholder="********"
                  className="" // Add padding to the left to make space for the icon
                  label="Password"
                  icon={
                    !showPassword ? (
                      <IconEye
                        className="cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <IconEyeClosed
                        className="cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )
                  }
                  labelProps={{
                    className: "",
                  }}
                  onChange={handleChange}
                  value={values.password}
                  error={errors.password ? true : false}
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
              {/* <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        /> */}
              <Typography
                // color="gray"
                className="mt-4 text-center font-light text-sm text-secondaryText"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <a href="/login" className="font-medium text-primary">
                  Log In{" "}
                </a>
                if you have already account
              </Typography>
              <Button
                className="mt-6 bg-primary "
                type="submit"
                fullWidth
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Create account
              </Button>
            </form>
          </Card>
        )}
        {step === 1 && (
          <Card
            className="shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] w-full px-5 bg-white rounded-xl "
            color="transparent"
            shadow={true}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div className="w-full">
              <h1>
                A 6 digit email has been sent to your ba********@gmail.com email
              </h1>
              <span>
                pleas check your inbox and past the verification code given
                below
              </span>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default Register;
