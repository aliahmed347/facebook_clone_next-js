import mongoose from "mongoose";
import { models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    DOB: {
      type: Date,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    gender: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default: "/asset/images/logo.png",
    },

    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    //   requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

models["USER"] = mongoose.model("User", userSchema);

export default models.USER;
