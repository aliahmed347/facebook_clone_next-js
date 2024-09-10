import React, { useState } from "react";
import { IGroup, IUser } from "@/types";
import { FaCamera, FaRegEdit, FaUser, FaUserMinus } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { RotatingLines } from "react-loader-spinner";
import JoinButton from "../JoinButton/page";
import UpdateImage from "./UpdateImage";
import useUserStore from "../../../store/userStore";

const GroupProfile = ({
  group,
  setGroup,
}: {
  group: IGroup;
  // handelFollow: () => void;
  // handelUnFollow: () => void;
  setGroup: (u: IGroup) => void;
}) => {
  const { user }: any = useUserStore();
  const [imageModal, setImageModal] = useState<{
    open: boolean;
    name: "profile" | "cover" | "";
  }>({ open: false, name: "" });

  return (
    <>
      <UpdateImage
        modalDetails={imageModal}
        setModalDetails={setImageModal}
        setGroup={setGroup}
        group={group}
      />

      <div className="w-full relative mb-1  ">
        <div
          className={`relative w-full h-56 rounded-xl ${
            group.banner
              ? "bg-cover bg-center"
              : "bg-gradient-to-tr to-[#D1D5DB] from-blue-gray-500"
          }`}
          style={{
            backgroundImage: group.banner
              ? `url('${group.banner}')`
              : undefined,
          }}
        >
          <div className="w-24 h-24 absolute left-4 -bottom-12 ">
            <img
              src={group.avatar}
              alt={group.name}
              className="w-24 h-24 rounded-full  border-4 border-white bg-gradient-to-tr to-[#D1D5DB] from-blue-gray-500"
            />
            {group?.admin?._id === user?._id && (
              <button className="absolute right-1 bottom-1 bg-white rounded-full p-2 shadow-md translate-x-1/4 translate-y-1/4">
                <FaCamera
                  className="text-gray-500"
                  onClick={() => setImageModal({ name: "profile", open: true })}
                />
              </button>
            )}
          </div>
          {group?.admin?._id === user?._id && (
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
            <h2 className="text-xl font-semibold">{group?.name}</h2>
            <p className="text-sm text-secondaryText">
              <span>{group?.members?.length}</span> members
            </p>
          </div>
          <JoinButton group={group} setGroup={setGroup} />
        </div>
      </div>
      <div className="w-full text-start mb-3">
        <p className="text-secondaryText text-sm">{group?.description}</p>
      </div>
    </>
  );
};

export default GroupProfile;
