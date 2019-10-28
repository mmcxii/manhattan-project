import AWS from 'aws-sdk';
import { BucketName } from 'aws-sdk/clients/iotanalytics';
import { IUserRequest, IUserToken } from '../interfaces';
import { User, IUserDocument, UserData } from '../models';
import { NotFound, Ok } from '../routes/Status';
import { Response } from 'express';
import { ObjectID } from "bson";

const S3_BUCKET: BucketName = process.env.S3_BUCKET || '';

AWS.config.region = 'us-west-2';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const s3methods = {
  uploadImg: async function(req: IUserRequest, res: Response, img: Buffer): Promise<Response> {
    const { _id, username } = req.token as IUserToken;

    const data = await s3.upload({
      Bucket: S3_BUCKET,
      Key: `${_id}/avatar.png`,
      Body: img,
      ContentType: 'image/png',
      ACL: 'public-read'
    })
    .promise();

    console.log(data);

    const user: IUserDocument | null = await User.findOneAndUpdate(
      { _id },
      { imgUrl: data.Location },
      {
        new: true
      }
    );

    if (user == null) {
      return NotFound(res, `Could not update image for ${username} because username does not exist.`);
    }

    const userData = new UserData(user);

    return Ok(res, userData);
  },
  deleteImg: async function (_id: ObjectID ) {
    const data = await s3.deleteObjects({
      Bucket: S3_BUCKET,
      Delete: {
        Objects: [{Key: `username/avatar.png`,}]
      } 
    })
    .promise();

    return data;
  }
};
