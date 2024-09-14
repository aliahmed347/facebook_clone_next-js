import { INotification } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RenderNotification from "./RenderNotification";
import { RotatingLines } from "react-loader-spinner";

const Notifications = ({ className }: { className: string }) => {
  const [notifications, setNotifications] = useState<INotification[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const getAllNotifications = async () => {
    try {
      setLoading(true)
      const { data } = await axios("/api/Notification/getNotifications", {
        method: "GET",
      });
      setNotifications(data.notifications);
    } catch (error) {
      console.log("🚀 ~ getAllNotifications ~ error:", error);
    }finally{
      setLoading(false)

    }
  };
  useEffect(() => {
    getAllNotifications();
  }, []);

  return (
    <div className={` ${className}`}>
      <div className="w-full h-full px-3 overflow-y-scroll no-scrollbar">
        {loading && (
          <div className="w-full flex justify-center items-center">
            <RotatingLines
              visible={true}
              width="20"
              strokeWidth="3"
              animationDuration="1"
              ariaLabel="rotating-lines-loading"
              strokeColor="#E4E6E9"
            />
          </div>
        )}
        {notifications &&
          notifications.map((not: INotification, index) => {
            return <RenderNotification key={index} {...not} />;
          })}
      </div>
    </div>
  );
};

export default Notifications;
