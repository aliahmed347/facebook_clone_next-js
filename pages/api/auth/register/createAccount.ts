import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/../utils/mongodb";
import USER from "../../../../src/models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "method not allowed",
    });
  }

  try {
    await connectDB();

    const { first_name, last_name, email, password, DOB, gender } = req.body;

    const isExist = await USER.findOne({
      email,
    });

    if (isExist) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "this email is already register with us" });
    }

    // const salt = (await bcrypt.genSalt(12)).toString();
    // return;
    const hash = await bcrypt.hash(password, 12);

    const user = await USER.create({
      first_name,
      last_name,
      email,
      password: hash,
      DOB,
      gender,
    });

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error);
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "Error from server",
      serverError: error,
    });
  }
};

export default handler;
