import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "../../../utils/getServerSession";
import USER from "../../../src/models/User";


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

        const { banner, avatar, bio, firstName, lastName, DOB, gender } = req.body;

        const updateFields = {} as any;

        if (avatar) updateFields.avatar = avatar;
        if (banner) updateFields.banner = banner;
        if (bio) updateFields.bio = bio;
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (DOB) updateFields.DOB = DOB;
        if (gender) updateFields.gender = gender;

        const dbUser = await USER.findByIdAndUpdate(
            user._id, // Directly use the user ID
            updateFields,
            { new: true }
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
