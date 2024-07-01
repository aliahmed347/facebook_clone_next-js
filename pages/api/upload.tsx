import multer from "multer";
import { handleUpload } from "../../lib/cloudinaryHelper";
import { NextApiRequest, NextApiResponse } from "next";
import MiddlewareRunner from "../../utils/middlewareRunner";
import { StatusCodes } from "http-status-codes";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
interface MulterRequest extends NextApiRequest {
  file: Express.Multer.File;
}
const storage = multer.memoryStorage();
const upload = multer({ storage });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "method not allowed",
    });
  }
  try {
    const user: any = await getServerSession(req, res, authOptions);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Unauthorized" });
    }
    await MiddlewareRunner(req, res, upload.single("sample_file"));
    const file = (req as MulterRequest).file;

    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error: any) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
};
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
