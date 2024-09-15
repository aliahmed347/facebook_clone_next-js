import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "../../../utils/getServerSession";
import USER from "@/models/User";
import POST from "@/models/Post";


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

        const { id } = req.query;

        const dbUser: any = await USER.findById(id).select("-password").populate('friends').populate('receiveRequests').populate('sentRequests')

        const dbPosts: any = await POST.find({ author: id, group: null }).populate({ path: 'comments', populate: { path: 'replies' } }).populate({ path: 'comments', populate: { path: 'author' } }).populate("author").sort({ createdAt: -1 });


        return res.status(StatusCodes.OK).json({ user: dbUser, posts: dbPosts });
    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error from server",
            serverError: error,
        });
    }
};

export default handler;
