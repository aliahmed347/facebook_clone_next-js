import { IUser } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FollowButton from "../FollowButton/page";

const FollowUserProfile = ({
  user,
  refreshHandler,
}: {
  user: IUser;
  refreshHandler?: () => void;
}) => {
  return (
    <div className="w-full bg-white flex items-start p-4 gap-5 rounded-xl mt-2">
      <Image src={user.avatar} alt="Image" width={70} height={70} />
      <div className="">
        <Link
          href={`/user/${user._id}`}
          className="text-lg font-medium hover:underline"
        >
          {user.firstName + " " + user.lastName}
        </Link>
        <FollowButton user={user} refreshHandler={refreshHandler} />
      </div>
    </div>
  );
};

export default FollowUserProfile;
