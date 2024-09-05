"use client";
import { IUser } from "@/types";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaRegEdit, FaUser, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import UpdateUser from "../UserProfile/UpdateUser";

const FollowButton = ({
  user,
  setUser,
  refreshHandler,
}: {
  user: IUser;
  setUser?: (user: IUser) => void;
  refreshHandler?: () => void;
}) => {
  const { data }: any = useSession();
  const [loadFollow, setLoadFollow] = useState(false);
  const [userModal, setUserModal] = useState<{
    open: boolean; 
  }>({ open: false });

  const handleFollow = async () => {
    setLoadFollow(true);
    try {
      const res = await axios("/api/friend/sendReq", {
        method: "POST",
        data: {
          senderId: data.user?._id,
          userId: user?._id,
        },
      });
      setUser !== undefined && setUser(res.data.user);
      refreshHandler !== undefined && (await refreshHandler());
    } catch (error) {
      console.log("🚀 ~ handelFollow ~ error:", error);
    } finally {
      setLoadFollow(false);
    }
  };
  const handleUnfollow = async () => {
    setLoadFollow(true);
    try {
      const res = await axios("/api/friend/removeReq", {
        method: "POST",
        data: {
          senderId: data.user?._id,
          userId: user?._id,
        },
      });
      setUser !== undefined && setUser(res.data.user);
      refreshHandler !== undefined && (await refreshHandler());
    } catch (error) {
      console.log("🚀 ~ handelFollow ~ error:", error);
    } finally {
      setLoadFollow(false);
    }
  };

  const handleAccept = async () => {
    setLoadFollow(true);
    try {
      const res = await axios("/api/friend/acceptReq", {
        method: "POST",
        data: {
          senderId: data.user?._id,
          userId: user?._id,
        },
      });
      setUser !== undefined && setUser(res.data.user);
      refreshHandler !== undefined && (await refreshHandler());
    } catch (error) {
      console.log("🚀 ~ handelFollow ~ error:", error);
    } finally {
      setLoadFollow(false);
    }
  };

  return (
    <>
      {setUser && (
        <UpdateUser
          modalDetails={userModal}
          setModalDetails={setUserModal}
          setUser={setUser}
          user={user}
        />
      )}
      {loadFollow ? (
        <>
          <Button
            className="bg-primary flex justify-center items-center gap-2"
            fullWidth
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <RotatingLines
              visible={true}
              width="20"
              strokeWidth="3"
              animationDuration="1"
              ariaLabel="rotating-lines-loading"
              strokeColor="#d9d6f1"
            />
            loading
          </Button>
        </>
      ) : user._id === data?.user?._id ? (
        <Button
          className="bg-primary flex justify-center items-center gap-2"
          fullWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={() => setUserModal({ open: true })}
        >
          <FaRegEdit className="" size={20} />
          Update
        </Button>
      ) : user.receiveRequests.some((ele) => ele._id === data.user._id) ? (
        <Button
          className="bg-primary flex justify-center items-center gap-2"
          fullWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={handleUnfollow}
        >
          <FaUserMinus className="" size={20} />
          Requested
        </Button>
      ) : user.sentRequests.some((ele) => ele._id === data.user._id) ? (
        <Button
          className="bg-primary flex justify-center items-center gap-2"
          fullWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={handleAccept}
        >
          <FaUserPlus className="" size={20} />
          Accept Request
        </Button>
      ) : user.friends.some((ele) => ele._id === data.user._id) ? (
        <Button
          className="bg-primary flex justify-center items-center gap-2"
          fullWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={handleUnfollow}
        >
          <FaUserMinus className="" size={20} />
          Unfriend
        </Button>
      ) : (
        <Button
          className="bg-primary flex justify-center items-center gap-2"
          fullWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={handleFollow}
        >
          <FaUser className="" size={20} />
          Send Request
        </Button>
      )}
    </>
  );
};

export default FollowButton;
