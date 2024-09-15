import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "../../../utils/getServerSession";
import POST from "@/models/Post";
import { authOptions } from "../auth/[...nextauth]";
import GROUP from "@/models/Group";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "method not allowed",
    });
  }
  try {
    const user: any = await getServerSession(req, res);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
    }


    const groups = await GROUP.find({ members: { $in: [user._id] } });

    const groupIds = groups.map(group => group._id);

    const posts = await POST.find({
      author: { $ne: user._id },
      $or: [
        { group: { $in: groupIds } },
        { group: null }
      ]
    }).populate({ path: 'comments', populate: { path: 'replies' } }).populate({ path: 'comments', populate: { path: 'author' } }).populate("author").populate('group').sort({ createdAt: -1 });

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
