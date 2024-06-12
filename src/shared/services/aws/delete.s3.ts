import { s3 } from "./config";

export default {
  delete: (name_file: string) => {
      s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: name_file });
  }
}