import { getServerSession as serverSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/../utils/mongodb";
import { StatusCodes } from "http-status-codes";
import USER from "@/models/User";

const getServerSession = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  try {
    const session: any = await serverSession(req, res, authOptions);

    if (!session) return null;

    const user = USER.findOne({ email: session?.user?.email });

    if (!user) return null;

    return user;
  } catch (error) {
    console.log("🚀 ~ getServerSession ~ error:", error);
    return null;
  }
};

export default getServerSession;
