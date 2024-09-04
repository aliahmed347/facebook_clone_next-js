import React from "react";
import NavbarItems from "../../../utils/navbarItems";

const NavbarSkelton = () => {
  return (
    <nav className="bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] sticky z-[99] top-0 w-full py-2 px-4 ">
      <div className="w-full  lg:hidden flex justify-between gap-1  ">
        {/* <Image src="/asset/images/logo.png" alt="logo" width={40} height={40} /> */}
        <div className="w-[40px] h-[40px] bg-gray-500 rounded-full" />
        <div className="flex gap-1">
          <div className="bg-gray-500 p-2 rounded-[20px]  justify-center items-center flex   ">
            <div className="bg-transparent text-primaryText text-base border-none outline-none w-full sm:w-auto " />
            <button className="text-gray-500 w-[20px] h-[20px] rounded-full">
              {/* <IconSearch size={20} /> */}
            </button>
          </div>

          <button className="rounded-full h-10 w-10 bg-gray-500  justify-center items-center flex lg:hidden">
            {/* <IconBell size={24} className="text-primaryText" /> */}
          </button>
        </div>
      </div>
      <div className="  flex justify-between items-center  ">
        <div className=" w-1/6 xl:w-1/4 hidden lg:block ">
          <div className="flex items-center gap-2 ">
            <div className="w-[40px] h-[40px] bg-gray-500 rounded-full" />
            <div className="bg-gray-500 p-2 rounded-[20px]  justify-center items-center hidden xl:flex ">
              <div className="bg-transparent text-primaryText text-base border-none outline-none w-48" />
              <button className="bg-gray-500 w-[20px] h-[20px] rounded-full"></button>
            </div>
          </div>
        </div>
        <div className="lg:w-4/6 w-5/6 xl:w-2/4 px-3">
          <ul className="flex justify-around items-center gap-2  ">
            {NavbarItems.map((item, index) => (
              <li
                key={index}
                className="w-1/2 h-[3rem] flex justify-center items-center hover:bg-backgroundColor rounded-lg  "
              >
                <div className="w-full flex justify-center items-center">
                  <div className={` w-[30px]  h-[30px] bg-gray-500 rounded-full`} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/6 xl:w-1/4 flex justify-end items-center gap-3  ">
          <button className="rounded-full h-10 w-10 bg-gray-500  justify-center items-center hidden lg:flex"></button>
          <button className="rounded-full h-10 w-10 bg-gray-500  justify-center items-center hidden lg:flex"></button>
          <div className="relative">
            <div className="cursor-pointer hidden xl:block w-10 h-10 bg-gray-500 rounded-full" />
          </div>

          <button className="rounded-full h-10 w-10 bg-gray-500  justify-center items-center flex xl:hidden"></button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSkelton;
