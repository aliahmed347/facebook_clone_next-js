"use client";
import { IGroup } from "@/types";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { FaRegEdit, FaUserMinus, FaUserPlus } from "react-icons/fa";
import useUserStore from "../../../store/userStore";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import UpdateGroup from "../GroupProfile/Updategroup";

const JoinButton = ({
  group,
  setGroup,
}: {
  group: IGroup;
  setGroup: (group: IGroup) => void;
}) => {
  const { user } = useUserStore();
  const [submitting, setSubmitting] = useState(false);
  const [groupModal, setGroupModal] = useState<{
    open: boolean;
  }>({ open: false });
  const handleJoin = async () => {
    setSubmitting(true);
    try {
      const res = await axios("/api/group/join", {
        method: "POST",
        data: {
          groupId: group?._id,
          userId: user?._id,
        },
      });
      setGroup !== undefined && setGroup(res.data.group);
    } catch (error) {
      console.log("🚀 ~ handleJoin ~ error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleLeave = async () => {
    setSubmitting(true);
    try {
      const res = await axios("/api/group/leave", {
        method: "POST",
        data: {
          groupId: group?._id,
          userId: user?._id,
        },
      });
      setGroup !== undefined && setGroup(res.data.group);
    } catch (error) {
      console.log("🚀 ~ handleJoin ~ error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <UpdateGroup
        modalDetails={groupModal}
        setModalDetails={setGroupModal}
        group={group}
        setGroup={setGroup}
      />
      {submitting ? (
        <Button
          className="bg-primary flex justify-center items-center gap-2"
          fullWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          // onClick={() => setUserModal({ open: true })}
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
      ) : group.admin._id === user._id ? (
        <Button
          className="bg-primary flex justify-center items-center gap-2"
          fullWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={() => setGroupModal({ open: true })}
        >
          <FaRegEdit className="" size={20} />
          Update
        </Button>
      ) : group.members.some((m) => m._id === user._id) ? (
        <Button
          className="bg-primary flex justify-center items-center gap-2"
          fullWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={handleLeave}
        >
          <FaUserMinus className="" size={20} />
          Leave
        </Button>
      ) : (
        <Button
          className="bg-primary flex justify-center items-center gap-2"
          fullWidth
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={handleJoin}
        >
          <FaUserPlus className="" size={20} />
          Join
        </Button>
      )}
    </>
  );
};

export default JoinButton;
