import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "../../../utils/getServerSession";
import POST from "@/models/Post";
import { authOptions } from "../auth/[...nextauth]";

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

        const { postId, userId, } = req.body;

        const DBPost: any = await POST.findOne({ _id: postId, isDeleted: false });

        if (DBPost.savedBy.includes(userId)) {

            const post = await POST.findByIdAndUpdate(
                { _id: postId },
                { $pull: { savedBy: userId } },
                { new: true }
            ).populate("author").populate({ path: 'comments', populate: { path: 'replies' } }).populate({ path: 'comments', populate: { path: 'author' } }).populate('group');

            return res.status(StatusCodes.OK).json({ post });
        }

        const post = await POST.findByIdAndUpdate(
            { _id: postId },
            { $push: { savedBy: userId } },
            { new: true }
        ).populate("author").populate({ path: 'comments', populate: { path: 'replies' } }).populate({ path: 'comments', populate: { path: 'author' } }).populate('group');

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
