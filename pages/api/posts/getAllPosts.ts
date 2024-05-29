import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "../../../utils/getServerSession";
import POST from "@/models/Post";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "method not allowed",
    });
  }
  try {
    const user: any = await getServerSession(req, res);
    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
    }
    const posts = await POST.find({})
      .populate("author")
      // .sort({ createdAt: -1 });
    return res.status(StatusCodes.OK).json({ posts });
  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Error from server",
      serverError: error,
    });
  }
};

export default handler;
