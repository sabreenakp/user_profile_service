import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import config from "../utils/config";

const s3 = new AWS.S3({
  accessKeyId: config.AWS.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: config.AWS.AWS_REGION,
});

export const uploadFile = async (fileName: string, fileContent: any) => {
  try {
    const randomKey: any = uuidv4();
    const params: any = {
      Bucket: config.AWS.AWS_BUCKET_NAME,
      Key: randomKey + "_" + fileName,
      Body: fileContent,
    };
    await s3.upload(params).promise();
    return {
        status: true,
        message: "Success",
        statusCode: 200,
        data: params.Key,
      };
  } catch (error) {
    return {
      status: false,
      message: "Please try again",
      statusCode: 500,
      error,
    };
  }
};

export const getSignedUrl = async (filePath: string) => {
  try {
    const myBucket = config.AWS.AWS_BUCKET_NAME;
    const myKey = filePath;
    const signedUrlExpireSeconds =
      60 * parseInt(config.AWS.AWS_S3_SIGNED_URL_EXPIRY, 10);
    const signedUrl = await s3.getSignedUrlPromise("getObject", {
      Bucket: myBucket,
      Key: myKey,
      Expires: signedUrlExpireSeconds,
    });
    return {
      status: true,
      message: "Success",
      statusCode: 200,
      data: signedUrl,
    };
  } catch (error) {
    return {
      status: false,
      message: "Please try again",
      statusCode: 500,
      error,
    };
  }
};
