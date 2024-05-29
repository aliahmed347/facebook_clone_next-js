"use client";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import * as yup from "yup";
import { IconEye, IconEyeClosed, IconEyeOff } from "@tabler/icons-react";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import Loader from "@/components/loader";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [loader, setLoader] = useState({ open: false, text: "" });

  useEffect(() => {
    const validateUser = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        if (session) {
          router.push("/");
        }
      } catch (error) {
        console.log("🚀 ~ validateUser ~ error:", error);
      } finally {
        setLoading(false);
      }
    };
    validateUser();
  }, []);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter invalid email")
      .required("Email not empty "),
    password: yup
      .string()
      .required("Password not empty")
      .min(8, "Min length 8 character"),
  });

  const { handleSubmit, handleBlur, handleChange, errors, values } = useFormik({
    validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const logUser = async () => {
        try {
          setLoader({ open: true, text: "Submit" });
          const data: any = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
            callbackUrl: "/",
          });

          if (data.ok) {
            return router.push("/");
          }
          setError(data.error || "");
        } catch (error: any) {
          setError(error.response.data.error);
          console.log("🚀 ~ createUser ~ error:", error);
        } finally {
          setLoader({ open: false, text: "" });
        }
      };
      logUser();
    },
  });
  return (
    <>
      <Loader loading={loader.open} text={loader.text} />
      {!loading ? (
        <section className="w-full min-h-screen flex gap-3 lg:gap-0 flex-col md:flex-row justify-evenly items-center p-5 md:p-10 ">
          <div className=" w-full md:w-1/2 flex md:p-6 flex-col justify-start items-start">
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
          <div className="w-full md:w-2/5 flex justify-center items-center">
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
                onSubmit={(e: any) => {
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
                  <Input
                    size="lg"
                    placeholder="name@mail.com"
                    className=""
                    label="Email"
                    labelProps={{
                      className: "",
                    }}
                    name="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    crossOrigin={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />

                  <Input
                    type={showPassword ? "text" : "password"}
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
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    crossOrigin={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>

                <Button
                  type="submit"
                  className="mt-6 bg-primary "
                  fullWidth
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Log in
                </Button>
                <Typography
                  // color="gray"
                  className="mt-4 text-center font-light text-sm text-primary"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <a href="#" className="font-medium ">
                    Forget{" "}
                  </a>
                  Your Password
                </Typography>

                <hr className="mt-2" />
                <Link href="/register">
                  <Button
                    className="mt-6 py-4 bg-green-500 "
                    fullWidth
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Create account
                  </Button>
                </Link>
              </form>
            </Card>
          </div>
        </section>
      ) : (
        <section className="w-full min-h-screen flex gap-3 lg:gap-0 flex-col md:flex-row justify-evenly items-center p-5 md:p-10 ">
          <div className=" w-full md:w-1/2 flex md:p-6 flex-col justify-start items-start">
            <div className="w-[265px] h-[106px] bg-gray-500 rounded-lg " />
            <h2 className="  text-xl md:text-2xl lg:text-3xl font-normal mt-6 bg-gray-500 rounded-lg h-11 w-full ">
              {/* Facebook helps you connect and share with the people in your life. */}
            </h2>
          </div>
          <div className="w-full md:w-2/5 flex justify-center items-center">
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
                onSubmit={(e: any) => {
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
                  <div className="bg-gray-500 rounded-lg h-11 w-full"></div>
                  <div className="bg-gray-500 rounded-lg h-11 w-full"></div>
                </div>

                <div className="bg-gray-500 my-6 rounded-lg h-11 w-full"></div>

                <Typography
                  // color="gray"
                  className=" bg-gray-500 h-6 w-28 mx-auto mt-6 rounded-lg text-center font-light text-sm text-primary"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <a href="#" className="font-medium "></a>
                </Typography>

                <hr className="mt-2" />
                <div className="bg-gray-500 mt-6  rounded-lg h-14 w-full"></div>
              </form>
            </Card>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
