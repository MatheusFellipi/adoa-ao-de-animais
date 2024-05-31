import { S3Client } from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";
import multer from "multer";
import multerS3 from "multer-s3";
import { resolve } from "path";

const s3 = new S3Client()


export default {
  upload(folder: string) {
    return multer({
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = randomBytes(16).toString("hex");
          const filename = `${fileHash}-${file.originalname}`;
          callback(null, filename);
        }
      })
    });
  },
  uploadS3(folder: string) {
    return multer({
      storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'some-bucket',
        key: (req, file, cb) => {
            randomBytes(16, (err, hash) => {
            if (err) cb(err);
            const fileName = `${hash.toString("hex")}-${file.originalname}`;
            cb(null, fileName);
      })
    })
  }
};
