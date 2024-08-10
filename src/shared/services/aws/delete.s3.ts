import { s3 } from "./config";

export const configAws = {
  delete: (name_file: string) => {
    if (process.env.NODE_ENV !== "production") return;
    s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: name_file });
  },
};
