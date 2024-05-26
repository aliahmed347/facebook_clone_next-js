import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../utils/authToken";
import USER from "@/models/User";
import { connectDB } from "@/../utils/mongodb";
import { JwtPayload } from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token: any = req.headers["token"];
    await connectDB();

    if (!token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Unauthorize user" });
    }

    const payload: JwtPayload = await verifyToken(token);

    if (!payload) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Unauthorize user" });
    }

    const user = await USER.findOne({ _id: payload.id });
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Unauthorize user" });
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Error from server",
      serverError: error,
    });
  }
};
export default handler;
