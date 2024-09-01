import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "../../../utils/getServerSession";
import USER from "@/models/User";


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

        const suggestedPeople = await USER.find({
            _id: { $ne: user._id },
        })
            .select('-password')
            .populate('receiveRequests').populate('sentRequests').populate('friends')


        return res.status(StatusCodes.OK).json({ suggestedPeople });
    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error from server",
            serverError: error,
        });
    }
};

export default handler;
