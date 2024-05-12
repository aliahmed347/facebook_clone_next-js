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
import { IconEye } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
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
        >
          <form className="mt-8 mb-2   w-full  max-w-screen-lg xl:max-w-screen-xl ">
            <div className="mb-1 flex flex-col gap-6 w-full ">
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=""
                label="Email"
                labelProps={{
                  className: "",
                }}
              />

              <Input
                type="password"
                size="lg"
                placeholder="********"
                className="" // Add padding to the left to make space for the icon
                label="Password"
                icon={<IconEye className="cursor-pointer" />}
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
            <Link href="/register">
              <Button className="mt-6 py-4 bg-green-500 " fullWidth>
                Create account
              </Button>
            </Link>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Login;
