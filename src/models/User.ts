import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    gender: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "/asset/images/profile.png",
      required: true,
    },
    banner: {
      type: String,
      default: "",
    },
    receiveRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

(mongoose.models as any) = {};

const USER = mongoose.model("User", userSchema);

export default USER;
