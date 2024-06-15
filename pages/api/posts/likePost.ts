import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "../../../utils/getServerSession";
import POST from "@/models/Post";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            error: "Method not allowed",
        });
    }

    try {
        const user: any = await getServerSession(req, res);
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
        }

        const { postId } = req.body;

        const DBPost: any = await POST.findOne({ _id: postId, isDeleted: false });

        if (DBPost.likes.includes(user._id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'You have already liked this post' });
        }

        const post = await POST.findByIdAndUpdate(
            { _id: postId },
            { $push: { likes: user._id } },
            { new: true }
        ).populate("author");

        return res.status(StatusCodes.OK).json({ post });
    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error from server",
            serverError: error,
        });
    }
};

export default handler;
