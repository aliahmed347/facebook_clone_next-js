import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import USER from "@/models/User";
import POST from "@/models/Post";
import getServerSession from "../../../../utils/getServerSession";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            error: "Method not allowed",
        });
    }

    try {
        const user: any = await getServerSession(req, res);

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
        }


        const dbPosts: any = await POST.find({ author: user._id }).populate({ path: 'comments', populate: { path: 'replies' } }).populate({ path: 'comments', populate: { path: 'author' } }).populate("author").populate('group').sort({ createdAt: -1 });


        return res.status(StatusCodes.OK).json({ posts: dbPosts });
    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error from server",
            serverError: error,
        });
    }
};

export default handler;
