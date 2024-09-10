import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "../../../utils/getServerSession";
import USER from "@/models/User";
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

        const { senderId, userId } = req.body;

        const dbUser = await USER.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    friends: senderId,
                    receiveRequests: senderId,
                    sentRequests: senderId,
                }
            },
            { new: true }
        )
            .select('-password')
            .populate('friends')
            .populate('receiveRequests')
            .populate('sentRequests');

        await USER.findByIdAndUpdate(
            senderId,
            {
                $pull: {
                    friends: userId,
                    receiveRequests: userId,
                    sentRequests: userId,
                }
            },
            { new: true } // Return the updated document
        )
            .select('-password')
            .populate('friends')
            .populate('receiveRequests')
            .populate('sentRequests');

        return res.status(StatusCodes.OK).json({ user: dbUser });
    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error from server",
            serverError: error,
        });
    }
};

export default handler;
