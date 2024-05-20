import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import randomize from "randomatic";

import { sendMail } from "../../../lib/sendMail";
import { RegistrationTemplate } from "../../../lib/EmailTamplates/emailTemplate";
import RegistrationOTP from "@/models/RegistrationOTP";
import USER from "@/models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "method not allowed",
    });
  }
  try {
    const { email } = req.body;

    if (!email) {
      res.status(StatusCodes.BAD_REQUEST).json({
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

    const code = randomize("A0a", 6);

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

    res.status(StatusCodes.OK).json(true);
  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error);
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "Error from server",
      serverError: error,
    });
  }
};
export default handler;
