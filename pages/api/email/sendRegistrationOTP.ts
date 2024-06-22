import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import randomize from "randomatic";
import { connectDB } from "@/../utils/mongodb";


import { sendMail } from "../../../utils/sendMail";
import { RegistrationTemplate } from "../../../src/components/EmailTamplates/emailTemplate";
import RegistrationOTP from "@/models/RegistrationOTP";
import USER from "@/models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "method not allowed",
    });
  }
  await connectDB();

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Email musts be require",
      });
    }

    const isExist = await USER.findOne({
      email,
    });

    if (isExist) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "This email is already register with us" });
    }

    const code = randomize("0", 6);

    await RegistrationOTP.updateMany({ email }, { is_Expire: true });

    const expireAt = new Date(Date.now() + 30 * 60 * 1000);

    const OTP = await RegistrationOTP.create({
      email,
      expireAt,
      otp: code,
    });

    const html = RegistrationTemplate(code);
    sendMail({
      to: email,
      subject: "Registration verification code",
      html,
    });

    return res.status(StatusCodes.OK).json(true);
  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Error from server",
      serverError: error,
    });
  }
};
export default handler;
