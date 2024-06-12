import multerS3 from "multer-s3";
import { randomBytes } from "crypto";
import { s3 } from "./config";

export default {
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: function (req, file, cb) {
      const fileHash = randomBytes(16).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
};
