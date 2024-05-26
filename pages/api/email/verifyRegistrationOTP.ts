import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import randomize from "randomatic";

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
  try {
    const { email, otp } = req.body;

    const OTP: any = await RegistrationOTP.findOne({
      email,
      otp,
    });

    if (!OTP) {
      await RegistrationOTP.findOneAndUpdate(
        { email },
        { $inc: { attempts: 1 } },
        { new: true }
      );
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "please enter valid OTP",
      });
    }

    if (OTP.attempts >= 3) {
      await RegistrationOTP.findOneAndUpdate({ email }, { is_Expire: true });
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Your OTP is expire due to many attempts" });
    }

    if (OTP.expireAt < Date.now()) {
      await RegistrationOTP.findOneAndUpdate({ email }, { is_Expire: true });
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Your OTP time is  Expired" });
    }

    if (OTP.is_Expire) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Your OTP is Expired" });
    }

    await RegistrationOTP.updateMany({ email }, { is_Expire: true });

    res.status(StatusCodes.OK).json(true);
  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Error from server",
      serverError: error,
    });
  }
};
export default handler;
