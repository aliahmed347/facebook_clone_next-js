import React, { ReactNode } from "react";
interface ModalProps {
  children: ReactNode; // Define children prop with ReactNode type
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full ">
        <div className=" w-11/12 sm:w-3/4 md:3/5 lg:w-1/2   max-h-[560px] overflow-y-auto rounded-xl ">
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
