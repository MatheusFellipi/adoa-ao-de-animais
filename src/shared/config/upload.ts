import { randomBytes } from "crypto";
import multer from "multer";
import path, { resolve } from "path";

import uploads3 from "@shared/services/aws/upload.s3";
const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const config = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (__, file, cb) => {
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
  },
};

export const uploadConfig = {
  upload(folder: string) {
    return multer({
      ...config,
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (__, file: any, callback) => {
          const fileHash = randomBytes(16).toString("hex");
          file.key = `${fileHash}-${file.originalname.replace(/\s+/g, '')}`;
          callback(null, file.key);
        },
      }),
    });
  },
  uploadS3(folder: string) {
    return multer({
      ...config,
      storage: uploads3.storage,
    });
  },
};
