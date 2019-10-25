import AWS from 'aws-sdk';

const S3_BUCKET: string = process.env.S3_BUCKET;

AWS.config.region = 'us-west-2';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const s3methods = {
  uploadImg: async function(username, img) {
    try {
      const data = await s3.upload({ Bucket: S3_BUCKET, Key: `${username}/avatar.png`, Body: img });
      return console.log(`Image uploaded successfully at ${data}`);
    } catch (err) {
      console.log(`Image upload failure: ${err}`);
      return false;
    }
  }
};
