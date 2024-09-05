"use client";
import React, { useEffect } from "react";
import useUserStore from "../../../store/userStore";
import axios from "axios";

const RenderChildren = ({ children }: { children: React.ReactNode }) => {
  const { setUser, user, setLoadUser } = useUserStore();

  const getUser = async () => {
    setLoadUser(true);
    try {
      const { data } = await axios(`/api/user/getUser`, {
        method: "GET",
      });
      setUser(data.user);
    } catch (error) {
      console.log("🚀 ~ getUser ~ error:", error);
    } finally {
      setLoadUser(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return <>{children}</>;
};

export default RenderChildren;
