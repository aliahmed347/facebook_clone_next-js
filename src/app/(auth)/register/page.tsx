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
import React from "react";

const Register = () => {
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
        <Card
          className="shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] w-full px-5 bg-white rounded-xl "
          color="transparent"
          shadow={true}
        >
          <form className="mt-8 mb-2   w-full  max-w-screen-lg xl:max-w-screen-xl ">
            <div className="mb-1 flex flex-col gap-6 w-full ">
              <div className="w-full flex flex-col sm:flex-row gap-y-5 gap-x-2 ">
                <Input
                  size="lg"
                  placeholder="John"
                  // className="w-full"
                  width='50%'
                  label="First Name"
                  labelProps={{
                    className: "",
                  }}
                />
                <Input
                  size="lg"
                  placeholder="Dou"
                  // className="w-full"
                  width='50%'
                  label="Last Name"
                  labelProps={{
                    className: "",
                  }}
                />
              </div>
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

              <Input
                type="date"
                size="lg"
                placeholder="Date of birth"
                // style={{}}
                className="  "
                label="Date of birth"
                labelProps={{
                  className: "",
                }}
              />

              <div className="flex flex-wrap justify-center gap-y-1 gap-x-2 ">
                <Radio name="type" label="Male" defaultChecked />
                <Radio name="type" label="Female" />
                <Radio name="type" label="Custom" />
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
            >
              <a href="/login" className="font-medium text-primary">
                Log In{" "}
              </a>
              if you have already account
            </Typography>
            <Button className="mt-6 bg-primary " fullWidth>
              Create account
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Register;
