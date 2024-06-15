import mongoose, { models } from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            require: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            require: true,
        },
        replies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],

        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    },
    { timestamps: true }
);

models["COMMENT"] = mongoose.model("Comment", CommentSchema);

export default models.COMMENT; 