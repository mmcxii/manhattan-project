import AWS from 'aws-sdk';
import { BucketName } from 'aws-sdk/clients/iotanalytics';

const S3_BUCKET: BucketName = process.env.S3_BUCKET || '';

AWS.config.region = 'us-west-2';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const s3methods = {
  uploadImg: async function(username: string, img: Buffer): Promise<boolean> {
    try {
      const data = await s3.upload({
        Bucket: S3_BUCKET,
        Key: `${username}/avatar.png`,
        Body: img,
        ContentType: 'image/png',
        ACL: 'public-read'
      });
      const success = await data.promise();
      return true;
    } catch (err) {
      return false;
    }
  }
};
