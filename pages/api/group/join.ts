import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "../../../utils/getServerSession";
import GROUP from "@/models/Group";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
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

        const { groupId, userId } = req.body;

        const group = await GROUP.findByIdAndUpdate(
            groupId,
            { $push: { members: userId } },
            { new: true }
        ).populate('members')
            .populate({
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
            })
            .populate('admin');

        return res.status(StatusCodes.OK).json({ group });
    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error from server",
            serverError: error,
        });
    }
};

export default handler;
