import { INotification } from "@/types";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import React from "react";

const RenderNotification = ({
  status,
  group,
  receiver,
  sender,
  createdAt,
}: INotification) => {
  return (
    <>
      {status === "WelComeNewUser" && (
        <div className="w-full px-2 mt-2 py-1 border-b border-gray-500 rounded-lg bg-[#E4E6E9] ">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">Welcome to Facebook</h3>
            <p className="text-sm">
              {formatDistanceToNowStrict(new Date(createdAt))}
            </p>
          </div>
          <p className="text-sm">
            Hi{" "}
            <span className="font-semibold">
              {receiver?.firstName} {receiver?.lastName}
            </span>
            , you are joining Facebook with
            <span className="font-semibold"> {receiver.email} </span>
            email address.
          </p>
        </div>
      )}
      {status === "ReceiveFriendRequest" && (
        <div className="w-full px-2 mt-2 py-1 border-b border-gray-500 rounded-lg bg-[#E4E6E9]">
          <Link href={`/user/${sender?._id}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">New Friend Request</h3>
              <p className="text-sm">
                {formatDistanceToNowStrict(new Date(createdAt))}
              </p>
            </div>
            <p className="text-sm">
              Hi{" "}
              <span className="font-semibold">
                {receiver?.firstName} {receiver?.lastName}
              </span>
              , you have received a friend request from{" "}
              <span className="font-semibold">
                {sender?.firstName} {sender?.lastName}
              </span>
              . Check it out!
            </p>
          </Link>
        </div>
      )}
      {status === "AcceptFriendRequest" && (
        <div className="w-full px-2 mt-2 py-1 border-b border-gray-500 rounded-lg bg-[#E4E6E9]">
          <Link href={`/user/${sender?._id}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">Friend Request Accepted</h3>
              <p className="text-sm">
                {formatDistanceToNowStrict(new Date(createdAt))}
              </p>
            </div>
            <p className="text-sm">
              Hi{" "}
              <span className="font-semibold">
                {receiver?.firstName} {receiver?.lastName}
              </span>
              , your friend request has been accepted by{" "}
              <span className="font-semibold">
                {sender?.firstName} {sender?.lastName}
              </span>
              . You are now friends!
            </p>
          </Link>
        </div>
      )}
      {status === "YouJoinGroup" && (
        <div className="w-full px-2 mt-2 py-1 border-b border-gray-500 rounded-lg bg-[#E4E6E9]">
          <Link href={`/group/${group?._id}`} className="">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">You Joined a Group</h3>
              <p className="text-sm">
                {formatDistanceToNowStrict(new Date(createdAt))}
              </p>
            </div>
            <p className="text-sm">
              Hi{" "}
              <span className="font-semibold">
                {receiver?.firstName} {receiver?.lastName}
              </span>
              , you have successfully joined the group{" "}
              <span className="font-semibold">{group?.name}</span>!
            </p>
          </Link>
        </div>
      )}
      {status === "UserJoinGroup" && (
        <div className="w-full px-2 mt-2 py-1 border-b border-gray-500 rounded-lg bg-[#E4E6E9]">
          <Link href={`/group/${group?._id}`} className="">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">
                New Member in Your Group
              </h3>
              <p className="text-sm">
                {formatDistanceToNowStrict(new Date(createdAt))}
              </p>
            </div>
            <p className="text-sm">
              Hi{" "}
              <span className="font-semibold">
                {receiver?.firstName} {receiver?.lastName}
              </span>
              ,{" "}
              <span className="font-semibold">
                {sender?.firstName} {sender?.lastName}
              </span>{" "}
              has just joined your group{" "}
              <span className="font-semibold">{group?.name}</span>!
            </p>
          </Link>
        </div>
      )}
      {status === "YourFriendCreatePost" && (
        <div className="w-full px-2 mt-2 py-1 border-b border-gray-500 rounded-lg bg-[#E4E6E9]">
          <Link href={`/user/${sender?._id}`} className="">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">
                New Post from Your Friend
              </h3>
              <p className="text-sm">
                {formatDistanceToNowStrict(new Date(createdAt))}
              </p>
            </div>
            <p className="text-sm">
              Hi{" "}
              <span className="font-semibold">
                {receiver?.firstName} {receiver?.lastName}
              </span>
              ,{" "}
              <span className="font-semibold">
                {sender?.firstName} {sender?.lastName}
              </span>{" "}
              has just created a new post!
            </p>
          </Link>
        </div>
      )}
      {status === "GroupUserCreatePost" && (
        <div className="w-full px-2 mt-2 py-1 border-b border-gray-500 rounded-lg bg-[#E4E6E9]">
          <Link href={`/group/${group?._id}`} className="">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">New Post in Your Group</h3>
              <p className="text-sm">
                {formatDistanceToNowStrict(new Date(createdAt))}
              </p>
            </div>
            <p className="text-sm">
              Hi{" "}
              <span className="font-semibold">
                {receiver?.firstName} {receiver?.lastName}
              </span>
              ,{" "}
              <span className="font-semibold">
                {sender?.firstName} {sender?.lastName}
              </span>{" "}
              has just created a new post in the group{" "}
              <span className="font-semibold">{group?.name}</span>!
            </p>
          </Link>
        </div>
      )}
      {status === "YourFriendCreateGroup" && (
        <div className="w-full px-2 mt-2 py-1 border-b border-gray-500 rounded-lg bg-[#E4E6E9]">
          <Link href={`/group/${group?._id}`} className="">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">New Group Created</h3>
              <p className="text-sm">
                {formatDistanceToNowStrict(new Date(createdAt))}
              </p>
            </div>
            <p className="text-sm">
              Hi{" "}
              <span className="font-semibold">
                {receiver?.firstName} {receiver?.lastName}
              </span>
              , your friend{" "}
              <span className="font-semibold">
                {sender?.firstName} {sender?.lastName}
              </span>{" "}
              has just created a new group{" "}
              <span className="font-semibold">{group?.name}</span>.
              <br />
              You can check it out anytime!
            </p>
          </Link>
        </div>
      )}
      {status === "UpdateYourProfile" && (
        <div className="w-full px-2 mt-2 py-1 border-b border-gray-500 rounded-lg bg-[#E4E6E9]">
          <Link href={`/user/${receiver?._id}`} className="">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">Profile Updated</h3>
              <p className="text-sm">
                {formatDistanceToNowStrict(new Date(createdAt))}
              </p>
            </div>
            <p className="text-sm">
              Hi{" "}
              <span className="font-semibold">
                {receiver?.firstName} {receiver?.lastName}
              </span>
              , you have successfully updated your profile.
              <br />
              Click here to view your updated profile!
            </p>
          </Link>
        </div>
      )}
    </>
  );
};

export default RenderNotification;
