import USER from "../src/models/User";
import mongoose, { ConnectOptions } from "mongoose";

const connectionOptions = {
  // Optional: Other connection options (e.g., useCreateIndex, useFindAndModify)
  dbName: "facebook",
} as ConnectOptions;

// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }

declare global {
  var connectDB: boolean;
}

const connectDB = async () => {
  if (global.connectDB) {
    console.log("Database is already connected");
  } else {
    try {
      await mongoose.connect("mongodb://localhost:27017", connectionOptions);
      USER.find();

      console.log("MongoDB is connected");
      global.connectDB = true; // Set a flag to prevent re-connection
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      // process.exit(1); // Exit the process on failure (optional)
    }
  }
};

export { connectDB };
