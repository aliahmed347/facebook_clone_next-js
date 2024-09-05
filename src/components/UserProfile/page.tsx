import React, { useState } from "react";
import { IUser } from "@/types";
import { FaCamera, FaRegEdit, FaUser, FaUserMinus } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { RotatingLines } from "react-loader-spinner";
import FollowButton from "../FollowButton/page";
import UpdateImage from "./UpdateImage";

const UserProfile = ({
  user,
  handelFollow,
  handelUnFollow,
  setUser,
}: {
  user: IUser;
  handelFollow: () => void;
  handelUnFollow: () => void;
  setUser: (u: IUser) => void;
}) => {
  const { data }: any = useSession();
  const [imageModal, setImageModal] = useState<{
    open: boolean;
    name: "profile" | "cover" | "";
  }>({ open: false, name: "" });

  return (
    <>
      <UpdateImage
        modalDetails={imageModal}
        setModalDetails={setImageModal}
        setUser={setUser}
      />

      <div className="w-full relative mb-1  ">
        <div
          className={`relative w-full h-56 rounded-xl ${
            user.banner
              ? "bg-cover bg-center"
              : "bg-gradient-to-tr to-[#D1D5DB] from-blue-gray-500"
          }`}
          style={{
            backgroundImage: user.banner ? `url('${user.banner}')` : undefined,
          }}
        >
          <div className="w-24 h-24 absolute left-4 -bottom-12 ">
            <img
              src={user.avatar}
              alt={user.firstName + " " + user.lastName}
              className="w-24 h-24 rounded-full  border-4 border-white bg-gradient-to-tr to-[#D1D5DB] from-blue-gray-500"
            />
            {user._id === data?.user?._id && (
              <button className="absolute right-1 bottom-1 bg-white rounded-full p-2 shadow-md translate-x-1/4 translate-y-1/4">
                <FaCamera
                  className="text-gray-500"
                  onClick={() => setImageModal({ name: "profile", open: true })}
                />
              </button>
            )}
          </div>
          {user._id === data?.user?._id && (
            <button className="absolute right-2 bottom-2 bg-white rounded-full p-2 shadow-md">
              <FaCamera
                className="text-gray-500"
                onClick={() => setImageModal({ name: "cover", open: true })}
              />
            </button>
          )}
        </div>

        <div className="mt-14 px-2 flex justify-between items-center ">
          <div className="w-[70%]">
            <h2 className="text-xl font-semibold">
              {user.firstName + " " + user.lastName}
            </h2>
            <p className="text-sm text-secondaryText">
              <span>{user?.friends?.length}</span> friends
            </p>
          </div>
          <FollowButton setUser={setUser} user={user} />
        </div>
      </div>
      <div className="w-full text-start mb-3">
        <p className="text-secondaryText text-sm">{user?.bio}</p>
      </div>
    </>
  );
};

export default UserProfile;
