import AWS from 'aws-sdk';
import { BucketName } from 'aws-sdk/clients/iotanalytics';
import { IUserRequest, IUserToken, IUser } from '../interfaces';
import { User, IUserDocument, UserData } from '../models';
import { NotFound, Ok } from '../routes/Status';
import { Response } from 'express';

const S3_BUCKET: BucketName = process.env.S3_BUCKET || '';

AWS.config.region = 'us-west-2';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const s3methods = {
  uploadImg: async function(req: IUserRequest, res: Response, img: Buffer) {
    
    const { _id, username } = req.token as IUserToken;
    
      const data = await s3.upload({
        Bucket: S3_BUCKET,
        Key: `${_id}/avatar.png`,
        Body: img,
        ContentType: 'image/png',
        ACL: 'public-read'
      });
      
      const success = await data.promise();
      
      const user: IUserDocument | null = await User.findOneAndUpdate({ _id }, {imgUrl: success.Location}, {
        new: true
      });

      if (user) {
        const userData = new UserData(user);
        console.log(userData);
        return Ok(res, userData);
      }

      return NotFound(res, `Could not update image for ${username} because username does not exist.`);
  }
};
