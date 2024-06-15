import mongoose, { models } from "mongoose";

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

models["POST"] = mongoose.model("Post", PostSchema);

export default models.POST;
