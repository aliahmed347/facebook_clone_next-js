import mongoose, { model, models } from "mongoose";
import { string } from "yup";

const OTPSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
    isExpire: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      require: true,
    },
    expireAt: {
      type: Date,
      require: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

models["RegistrationOTP"] = model("RegistrationOTP", OTPSchema);

export default models.RegistrationOTP;
