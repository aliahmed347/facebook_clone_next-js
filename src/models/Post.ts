import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    media: {
      type: String,
    },
    mediaType: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    shares: {
      type: Number,
    },
    reactions: {
      type: Map,
      of: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

mongoose.models = {};
const POST = mongoose.model("post", PostSchema);

export default POST;
