"use client";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import React from "react";

const Login = () => {
  return (
    <section className="w-full h-screen flex justify-evenly items-center py-10 px-10 ">
      <div className="w-1/2 p-6 flex flex-col justify-start items-start">
        <Image
          src="asset/images/facebook_logo.svg"
          alt="logo"
          width={50}
          height={50}
          className="w-[auto] h-[106px] "
        />
        <Typography variant="h2" className="text-3xl font-normal ml-6 ">
          Facebook helps you connect and share with the people in your life.
        </Typography>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <Card
          className="shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] px-5  bg-white rounded-xl "
          color="transparent"
          shadow={true}
        >
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-transparent  "
                label="Email"
                labelProps={{
                  className: "",
                }}
              />
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=""
                label="Password"
                labelProps={{
                  className: "",
                }}
              />
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
            <Button className="mt-6 bg-primary " fullWidth>
              Log in
            </Button>
            <Typography
              // color="gray"
              className="mt-4 text-center font-light text-sm text-primary"
            >
              <a href="#" className="font-medium ">
                Forget{" "}
              </a>
              Your Password
            </Typography>

            <hr className="mt-2" />
            <Button className="mt-6 py-4 bg-green-500 " fullWidth>
              Create account
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Login;
