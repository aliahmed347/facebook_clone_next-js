import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "../../../utils/getServerSession";
import GROUP from "@/models/Group";

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


        const groups = await GROUP.find({
            $or: [
                { members: { $in: [user._id] } },
                { admin: user._id }
            ]
        }).populate('members').populate({
            path: 'posts',
            options: { sort: { createdAt: -1 } },
            populate: [
                { path: 'group' },
                {
                    path: 'comments',
                    populate: [
                        { path: 'replies' },
                        { path: 'author' }
                    ]
                },
                { path: 'author' }
            ]
        }).populate('admin');



        return res.status(StatusCodes.OK).json({ groups });
    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error from server",
            serverError: error,
        });
    }
};

export default handler;
