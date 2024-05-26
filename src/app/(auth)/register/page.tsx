"use client";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import axios from "axios";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";
import getSession from "../../../../utils/getSession";

const Register = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otp, setOtp] = useState("");
  const inputs: any = useRef([]);
  const [error, setError] = useState<string>("");
  const [isResend, setIsResend] = useState(false); // Flag for button state
  const [remainingTime, setRemainingTime] = useState(0); // Timer in seconds (5 minutes)
  let timerId: string | number | NodeJS.Timeout | undefined; // Declare timerId outside handleSubmit

  const router = useRouter();

  useEffect(() => {
    const validateSession = async () => {
      try {
        const user = await getSession();
        setLoading(true);
        await router.push("/");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("🚀 ~ validateToken ~ error:", error);
      }
    };

    validateSession();
  }, []);

  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, []); // Empty dependency array ensures cleanup on unmount
  const handleOtpChange = (event: any) => {
    const newChar = event.target.value.slice(0, 1); // Get only the new character
    const newOtp = otp.slice(0, event.target.id.slice(-1)) + newChar; // Update OTP state with new character

    setOtp(newOtp);

    const currentInputIndex = inputs.current.indexOf(event.target);
    if (
      newOtp.length === currentInputIndex + 1 &&
      inputs.current[currentInputIndex + 1]
    ) {
      inputs.current[currentInputIndex + 1].focus();
    } else if (newOtp.length < currentInputIndex + 1) {
      // Focus on the previous input if backspacing in a non-empty box
      inputs.current[currentInputIndex - 1].focus();
    }
  };

  const handleBackspace = (event: any) => {
    if (event.key === "Backspace" && otp.length > 0) {
      setOtp(otp.slice(0, -1));
      inputs.current[inputs.current.indexOf(event.target) - 1].focus();
    }
  };

  const getFormattedTime = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmitOTP = async () => {
    if (otp.length === 6) {
      // Simulate OTP submission (replace with your API call)
      console.log("Submitting OTP:", otp);
      try {
        await axios({
          url: "api/email/verifyRegistrationOTP",
          method: "POST",
          data: {
            email: values.email,
            otp,
          },
        });

        createUser();
      } catch (error: any) {
        console.log("🚀 ~ handleSubmitOTP ~ error:", error);
        setError(error.response.data.error);
      }
    } else {
      console.log("Please enter all 6 digits of the OTP");
    }
  };

  const handleResendOtp = async () => {
    await setIsResend(true); // Disable button and start timer
    await setRemainingTime(180); // Reset timer for a new submission
    await sendOTP();
    timerId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timerId);
          setIsResend(false); // Re-enable button after timer completes
          // Consider handling timeout scenario (e.g., display message)
        }
        return prevTime - 1;
      });
    }, 1000); // Update timer every second

    // Implement resend OTP logic here (e.g., API call)
    console.log("Resend OTP clicked");
  };

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
      sendOTP();
    },
  });

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

  const sendOTP = async () => {
    try {
      const OTP: any = await axios({
        url: "api/email/sendRegistrationOTP",
        method: "POST",
        data: { email: values.email },
      });
      setStep(1);
      if (remainingTime !== 0) {
        handleResendOtp();
      }
      // sessionStorage.setItem("authToken", user.data.token);
    } catch (error: any) {
      setError(error.response.data.error);

      console.log("🚀 ~ createUser ~ error:", error);
    }
  };

  function maskEmail(email: string) {
    const atIndex = email.indexOf("@");
    const beforeAt = email.slice(0, atIndex); // Extract characters before "@"
    const afterAt = email.slice(atIndex + 1); // Extract characters after "@"

    // Limited masking (replace half the characters):
    const maskedBeforeAt = beforeAt.replace(/./g, (match, index) =>
      index < Math.floor(beforeAt.length / 3) ? match : "*"
    );

    return `${maskedBeforeAt}@${afterAt}`;
  }

  return (
    <>
      {!loading ? (
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
                  {error && (
                    <div className="relative block w-full py-2 px-4 mb-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
                      {error}
                    </div>
                  )}
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
                className="shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] w-full px-5 py-4 bg-white rounded-xl "
                color="transparent"
                shadow={true}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <form className="w-full text-center">
                  {error && (
                    <div className="relative block w-full py-2 px-4 mb-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
                      {error}
                    </div>
                  )}
                  <h1 className="text-2xl font-bold">OTP Verification</h1>

                  <h1>
                    {`A 6 digit email has been sent to your ${maskEmail(
                      values.email
                    )}
              email`}
                  </h1>
                  <span>
                    pleas check your inbox and past the verification code given
                    below
                  </span>
                  <div
                    id="otp"
                    className="flex flex-row justify-center text-center px-2 mt-5"
                  >
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input
                        key={i}
                        className="m-2 border h-10 w-10 text-center form-control rounded"
                        type="text"
                        id={`otp-${i}`}
                        maxLength={1}
                        value={otp.charAt(i - 1) || ""} // Set initial value from OTP state
                        onChange={handleOtpChange}
                        onKeyDown={handleBackspace}
                        ref={(el: any) => (inputs.current[i - 1] = el)} // Store references
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-center mt-5">
                    {isResend ? (
                      <div className="text-center mt-2 text-gray-700">
                        Request new OTP after: {getFormattedTime()}
                      </div>
                    ) : (
                      <div className="text-center mt-2 text-gray-700">
                        <span
                          className="text-primary"
                          onClick={handleResendOtp}
                        >
                          Resend
                        </span>{" "}
                        otp if you don,t receive
                      </div>
                    )}

                    <button
                      className={
                        otp.length === 6
                          ? "bg-blue-700 text-white px-4 py-2 rounded hover:bg-primary cursor-pointer "
                          : "bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmitOTP();
                      }}
                      type="submit"
                    >
                      Submit OTP
                    </button>
                  </div>
                </form>
              </Card>
            )}
          </div>
        </section>
      ) : (
        <section className="w-full min-h-screen flex gap-3 lg:gap-0 flex-col lg:flex-row justify-evenly items-center p-5 md:p-10 ">
          <div className=" w-full md:w-1/2 flex md:p-6 flex-col justify-start items-start">
            <div className="w-[265px] h-[100px] bg-gray-500 rounded-lg " />
            <h2 className="  text-xl md:text-2xl lg:text-3xl font-normal mt-6 bg-gray-500 rounded-lg h-11 w-full "></h2>
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
                  {error && (
                    <div className="relative block w-full py-2 px-4 mb-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
                      {error}
                    </div>
                  )}
                  <div className="mb-1 flex flex-col gap-6 w-full ">
                    <div className="w-full flex flex-col sm:flex-row gap-y-5 gap-x-2 ">
                      <div className="bg-gray-500 rounded-lg h-11 w-full"></div>

                      <div className="bg-gray-500 rounded-lg h-11 w-full"></div>
                    </div>
                    <div className="bg-gray-500 rounded-lg h-11 w-full"></div>

                    <div className="bg-gray-500 rounded-lg h-11 w-full"></div>

                    <div className="bg-gray-500 rounded-lg h-11 w-full"></div>

                    <div className="flex flex-wrap justify-center gap-y-1 gap-x-4 py-6">
                      <div className="bg-gray-500 rounded-full  h-4 w-4"></div>
                      <div className="bg-gray-500 rounded-full  h-4 w-20"></div>
                      <div className="bg-gray-500 rounded-full  h-4 w-4"></div>
                      <div className="bg-gray-500 rounded-full  h-4 w-20"></div>
                      <div className="bg-gray-500 rounded-full  h-4 w-4"></div>
                      <div className="bg-gray-500 rounded-full  h-4 w-20"></div>
                    </div>
                  </div>

                  <div className="bg-gray-500 rounded-full mx-auto  h-4 w-60"></div>

                  <div className="bg-gray-500 rounded-lg h-10 mt-5 w-full"></div>
                </form>
              </Card>
            )}
            {step === 1 && (
              <Card
                className="shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] w-full px-5 py-4 bg-white rounded-xl "
                color="transparent"
                shadow={true}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <form className="w-full text-center">
                  {error && (
                    <div className="relative block w-full py-2 px-4 mb-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
                      {error}
                    </div>
                  )}
                  <h1 className="text-2xl font-bold">OTP Verification</h1>

                  <h1>
                    {`A 6 digit email has been sent to your ${maskEmail(
                      values.email
                    )}
                email`}
                  </h1>
                  <span>
                    pleas check your inbox and past the verification code given
                    below
                  </span>
                  <div
                    id="otp"
                    className="flex flex-row justify-center text-center px-2 mt-5"
                  >
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input
                        key={i}
                        className="m-2 border h-10 w-10 text-center form-control rounded"
                        type="text"
                        id={`otp-${i}`}
                        maxLength={1}
                        value={otp.charAt(i - 1) || ""} // Set initial value from OTP state
                        onChange={handleOtpChange}
                        onKeyDown={handleBackspace}
                        ref={(el: any) => (inputs.current[i - 1] = el)} // Store references
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-center mt-5">
                    {isResend ? (
                      <div className="text-center mt-2 text-gray-700">
                        Request new OTP after: {getFormattedTime()}
                      </div>
                    ) : (
                      <div className="text-center mt-2 text-gray-700">
                        <span
                          className="text-primary"
                          onClick={handleResendOtp}
                        >
                          Resend
                        </span>{" "}
                        otp if you don,t receive
                      </div>
                    )}

                    <button
                      className={
                        otp.length === 6
                          ? "bg-blue-700 text-white px-4 py-2 rounded hover:bg-primary cursor-pointer "
                          : "bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmitOTP();
                      }}
                      type="submit"
                    >
                      Submit OTP
                    </button>
                  </div>
                </form>
              </Card>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
