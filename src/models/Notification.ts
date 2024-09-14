import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            require: false,
        },
        status: {
            type: "string",
            require: true
        }
    },
    { timestamps: true }
);

(mongoose.models as any) = {};
const NOTIFICATION = mongoose.model("Notification", NotificationSchema);

export default NOTIFICATION;
