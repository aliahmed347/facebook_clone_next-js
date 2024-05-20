import USER from "@/models/User";
import { StatusCodes } from "http-status-codes";
import { connectDB } from "@/../utils/mongodb";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "../../../../utils/authToken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "method not allowed",
    });
  }
  try {
    await connectDB();

    const { email, password } = req.body;

    const user: any = await USER.findOne({
      email,
    }).select("+password");

    console.log("🚀 ~ handler ~ user:", user);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "User not found",
      });
    }

    const isTrue = await bcrypt.compare(password, user?.password);

    if (!isTrue) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Password not match",
      });
    }

    const token = getToken(user._id);

    user.password = undefined;

    res.status(StatusCodes.OK).json({
      user,
      token,
    });
  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error);
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "Error from server",
      serverError: error,
    });
  }
};

export default handler;
