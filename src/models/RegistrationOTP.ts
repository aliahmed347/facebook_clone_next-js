import mongoose, { model } from "mongoose";
import { string } from "yup";

const OTPSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
    is_Expire: {
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
mongoose.models = {};

const RegistrationOTP = model("RegistrationOTP", OTPSchema);

export default RegistrationOTP;
