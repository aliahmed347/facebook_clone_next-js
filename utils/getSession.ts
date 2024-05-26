'use server'
import { getSession as Session } from "next-auth/react";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/../utils/mongodb";
import { StatusCodes } from "http-status-codes";
import USER from "@/models/User";

const getSession = async () => {
  await connectDB();
  try {
    const session: any = await Session(authOptions);

    if (!session) return null;

    const user = USER.findOne({ email: session?.user?.email });

    if (!user) return null;

    return user;
  } catch (error) {
    console.log("🚀 ~ getServerSession ~ error:", error);
    return null;
  }
};

export default getSession;
