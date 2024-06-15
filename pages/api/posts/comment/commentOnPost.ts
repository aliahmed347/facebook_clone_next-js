import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "../../../../utils/getServerSession";
import COMMENT from "@/models/Comment";
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

        const { post, content, author, commentId } = req.body;


        const comment = await COMMENT.create({
            content,
            post,
            author,
        })

        let newPost

        if (commentId) {
            const comments = await COMMENT.findByIdAndUpdate(
                { _id: commentId },
                { $push: { replies: comment._id } },
                { new: true }
            )

            newPost = await POST.findOne({ _id: post }).populate("author").populate({ path: 'comments', populate: { path: 'replies' } })
        } else {
            newPost = await POST.findByIdAndUpdate(
                { _id: post },
                { $push: { comments: comment._id } },
                { new: true }
            ).populate("author").populate({ path: 'comments', populate: { path: 'replies' } })

        }

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
