import { S3Client } from '@aws-sdk/client-s3';
import { randomBytes } from "crypto";
import multer from "multer";
import multerS3 from "multer-s3";
import path, { resolve } from "path";

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  region: process.env.AWS_DEFAULT_REGION,
  
})

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const config = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
}

export default {
  upload(folder: string) {
    return multer({
      ...config,
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (__, file, callback) => {
          const fileHash = randomBytes(16).toString("hex");
          file.key = `${fileHash}-${file.originalname}`;
          callback(null, file.key);
        }
      })
    });
  },
  uploadS3(folder: string) {
    return multer({
      ...config,
      storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',  
        key: function (req, file, cb) {
          const fileHash = randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;
          cb(null, fileName)
        }
      })
    })
  }
};
