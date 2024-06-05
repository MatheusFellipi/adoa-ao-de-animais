import aws from 'aws-sdk';


const s3 = new aws.S3({
  accessKeyId: "process.env.AWS_ACCESS_KEY_ID",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


export default {
  delete: (name_file: string) => {
      s3.deleteObject({ Bucket: process.env.BUCKET_NAME, Key: name_file });
  }

}