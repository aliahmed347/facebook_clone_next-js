import React from "react";

const Modal = ({ children }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full ">
        <div className="w-2/5 max-h-[560px] overflow-y-auto rounded-xl ">
          {/*content*/}
          <div className="bg-white p-3">{children}</div>
          {/*content*/}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
