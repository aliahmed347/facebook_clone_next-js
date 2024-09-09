import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "../../../utils/getServerSession";
import USER from "../../../src/models/User";
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
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
        }

        const { banner, avatar, description, name, DOB, gender, groupId } = req.body;

        const updateFields = {} as any;

        if (avatar) updateFields.avatar = avatar;
        if (banner) updateFields.banner = banner;
        if (name) updateFields.name = name;
        if (description) updateFields.description = description;
        if (DOB) updateFields.DOB = DOB;
        if (gender) updateFields.gender = gender;

        const dbGroup = await GROUP.findByIdAndUpdate(
            groupId, // Directly use the user ID
            updateFields,
            { new: true }
        ).populate('members').populate('posts').populate('admin')


        return res.status(StatusCodes.OK).json({ group: dbGroup });
    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error from server",
            serverError: error,
        });
    }
};

export default handler;
