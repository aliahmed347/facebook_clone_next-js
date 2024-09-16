import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "../../../utils/getServerSession";
import USER from "../../../src/models/User";
import NOTIFICATION from "@/models/Notification";
import CreateNotification from "../../../lib/createNotification";


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

        const { banner, avatar, bio, email, firstName, lastName, username, DOB, gender } = req.body;

        const updateFields = {} as any;

        if (avatar) updateFields.avatar = avatar;
        if (banner) updateFields.banner = banner;
        if (bio) updateFields.bio = bio;
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (username) updateFields.username = username;
        if (DOB) updateFields.DOB = DOB;
        if (gender) updateFields.gender = gender;

        const cUser = await USER.findOne({ username, email: { $ne: email } });

        if (cUser && cUser.username) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "This username or email is already register with us" });
        }


        const dbUser = await USER.findByIdAndUpdate(
            user._id, // Directly use the user ID
            updateFields,
            { new: true }
        )
            .select('-password')
            .populate('friends')
            .populate('receiveRequests')
            .populate('sentRequests');

        await CreateNotification({
            sender: `${user._id}`,
            receiver: `${user._id}`,
            status: 'UpdateYourProfile',
        })


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
