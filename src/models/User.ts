import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  DOB: {
    type: Date,
  },
  password: {
    type: String,
    require: true,
    // select: false,
  },
  gender: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    require,
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  //   requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
mongoose.models = {};

const USER = mongoose.model("User", userSchema);

export default USER;
