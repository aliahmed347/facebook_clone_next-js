import mongoose from "mongoose";

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
      default: "/asset/images/profile.png",
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
(mongoose.models as any) = {};

const USER = mongoose.model("User", userSchema);

export default USER;
