import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "../../../../utils/getServerSession";
import COMMENT from "@/models/Comment";
import POST from "@/models/Post";
import { authOptions } from "../../auth/[...nextauth]";

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

        const { post, author, commentId } = req.body;


        const comment = await COMMENT.findOne({
            _id: commentId,
            post
        })

        if (comment?.likes.includes(author)) {
            const comments = await COMMENT.findByIdAndUpdate(
                { _id: commentId },
                { $pull: { likes: author } },
                { new: true }
            )
        } else {
            const comments = await COMMENT.findByIdAndUpdate(
                { _id: commentId },
                { $push: { likes: author } },
                { new: true }
            )
        }


        const newPost = await POST.findOne({ _id: post }).populate("author").populate({ path: 'comments', populate: { path: 'replies' } }).populate({ path: 'comments', populate: { path: 'author' } })


        return res.status(StatusCodes.OK).json({ comments: newPost?.comments });

    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error from server",
            serverError: error,
        });
    }
};

export default handler;
