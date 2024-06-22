import multer from "multer";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import POST from "@/models/Post";
import getServerSession from "../../../utils/getServerSession";
import fs from "fs";
import MiddlewareRunner from "../../../utils/middlewareRunner";
import { authOptions } from "../auth/[...nextauth]";
interface MulterRequest extends NextApiRequest {
  file: Express.Multer.File;
}

const storage = multer.diskStorage({
  destination: function async(req, file, cb) {
    const dir = "public/asset/uploads/posts_media";


    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let uniqueSuffix;
    if (file.mimetype.startsWith("video")) {
      uniqueSuffix =
        Date.now() + "_" + Math.round(Math.random() * 1e9) + ".mp4";
    } else {
      uniqueSuffix =
        Date.now() + "_" + Math.round(Math.random() * 1e9) + ".png";
    }

    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "method not allowed",
    });
  }
  try {
    const user: any = await getServerSession(req, res);


    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
    }

    await MiddlewareRunner(req, res, upload.single("media"));

    const { content, mediaType } = req.body;
    const file = (req as MulterRequest).file;

    let relativePath;

    if (file) {
      relativePath = "asset/uploads/posts_media/" + file.filename;
    }

    const post = await POST.create({
      content,
      media: relativePath,
      mediaType,
      author: user._id,
    }).populate("author").populate({ path: 'comments', populate: { path: 'replies' } }).populate({ path: 'comments', populate: { path: 'author' } });

    return res.status(StatusCodes.OK).json({ post });
  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Error from server",
      serverError: error,
    });
  }
};

export default handler;
