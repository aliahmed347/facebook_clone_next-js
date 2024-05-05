"use client";
import { Tooltip } from "@material-tailwind/react";
import { IconBell, IconBrandMessenger, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavbarItems from "../../../utils/navbarItems";
import { usePathname } from "next/navigation";
import { AiFillMessage } from "react-icons/ai";
import { BiSolidMessageRoundedDots } from "react-icons/bi";

const Navbar = () => {
  const pathname = usePathname();
  // console.log("🚀 ~ Navbar ~ pathname:", pathname);

  return (
    <nav className="w-full py-2 px-4 sticky top-0 flex justify-between items-center bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] ">
      <div className="w-1/4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/asset/images/logo.png"
              alt="logo"
              width={40}
              height={40}
            />
          </Link>
          <div className="bg-backgroundColor p-2 rounded-[20px] flex justify-center items-center">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search facebook"
              className="bg-transparent text-primaryText text-base border-none outline-none "
            />
            <button className="text-secondaryText">
              <IconSearch size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="w-2/4 px-3">
        <ul className="flex justify-around items-center gap-2 ">
          {NavbarItems.map((item, index) => (
            <li
              key={index}
              className="w-1/2 h-[3rem] flex justify-center items-center hover:bg-backgroundColor rounded-lg  "
            >
              <Tooltip
                content={item.title}
                placement="bottom"
                className="bg-primaryText bg-opacity-60"
              >
                <Link
                  href={`${item.href}`}
                  className="w-full flex justify-center items-center"
                >
                  <item.icon
                    size={22}
                    className={` ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-secondaryText"
                    } `}
                  />
                </Link>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-1/4 flex justify-end items-center gap-3 ">
        <Tooltip
          content="Message"
          placement="bottom"
          className="bg-primaryText bg-opacity-60"
        >
          <button className="rounded-full h-10 w-10 bg-backgroundColor flex justify-center items-center">
            <IconBrandMessenger size={24} className="text-primaryText" />
          </button>
        </Tooltip>
        <Tooltip
          content="Notification"
          placement="bottom"
          className="bg-primaryText bg-opacity-60"
        >
          <button className="rounded-full h-10 w-10 bg-backgroundColor flex justify-center items-center">
            <IconBell size={24} className="text-primaryText" />
          </button>
        </Tooltip>
        <Image
          src="/asset/images/profile.png"
          alt="user"
          width={35}
          height={35}
          className="cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;
