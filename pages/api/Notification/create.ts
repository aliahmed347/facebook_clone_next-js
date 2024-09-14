import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import NOTIFICATION from "@/models/Notification";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            error: "Method not allowed",
        });
    }

    try {


        const { sender, receiver, status, group } = req.body;

        const notification = await (await (await (await NOTIFICATION.create({
            sender,
            receiver,
            status,
            group
        })).populate('receiver')).populate('sender')).populate('group');

        return res.status(StatusCodes.OK).json({ notification });
    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error from server",
            serverError: error,
        });
    }
};

export default handler;
