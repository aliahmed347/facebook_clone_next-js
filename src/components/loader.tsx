import React from "react";
import { Oval, RotatingLines } from "react-loader-spinner";

const Loader = ({ loading, text }: { loading: boolean; text: string }) => {
  return (
    <>
      {loading === true && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[9999] outline-none focus:outline-none w-full ">
            <div className=" rounded-xl flex flex-col justify-center items-center gap-3">
              {/*content*/}
              <RotatingLines
                visible={true}
                width="96"
                strokeWidth="3"
                animationDuration="1"
                ariaLabel="rotating-lines-loading"
                strokeColor="#d9d6f1"
              />
              <p className="text-white">{text}...</p>
            </div>
          </div>
          <div className="opacity-70 fixed inset-0 z-[9998] bg-black"></div>
        </>
      )}
    </>
  );
};

export default Loader;
