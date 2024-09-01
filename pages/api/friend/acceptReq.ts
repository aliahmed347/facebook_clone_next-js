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

        // Update the sender's document: remove the userId from sentRequests and add userId to friends
        await USER.findByIdAndUpdate(
            senderId, // Just pass the ID directly
            {
                $pull: {
                    sentRequests: userId,
                    receiveRequests: userId
                },
                $push: { friends: userId }
            },
            { new: true } // Return the updated document
        )
            .select('-password')
            .populate('friends')
            .populate('receiveRequests')
            .populate('sentRequests');

        // Update the user's document: remove the senderId from receiveRequests and add senderId to friends
        const dbUser = await USER.findByIdAndUpdate(
            userId, // Just pass the ID directly
            {
                $pull: {
                    receiveRequests: senderId,
                    sentRequests: senderId
                },
                $push: { friends: senderId }
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
