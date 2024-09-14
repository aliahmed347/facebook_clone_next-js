import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import NOTIFICATION from "@/models/Notification";
import getServerSession from "../../../utils/getServerSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
      error: "Method not allowed",
    });
  }

  try {
    const user: any = await getServerSession(req, res);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Unauthorized" });
    }

    const notifications = await NOTIFICATION.find({
      receiver: user._id,
    })
      .populate("receiver")
      .populate("sender")
      .populate("group")
      .sort({ createdAt: -1 });
    return res.status(StatusCodes.OK).json({ notifications });
  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error from server",
      serverError: error,
    });
  }
};

export default handler;
