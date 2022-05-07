import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

const config: any = {
  SERVER: {
    PORT: process.env.PORT,
  },
  DATABASE: {
    HOST: process.env.DB_HOST,
    NAME: process.env.DB_NAME,
  },
  AWS: {
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_S3_SIGNED_URL_EXPIRY:process.env.AWS_S3_SIGNED_URL_EXPIRY,
    AWS_COGNITO_USER_POOL_ID:process.env.AWS_COGNITO_USER_POOL_ID,
    AWS_COGNTIO_APP_CLIENT_ID:process.env.AWS_COGNTIO_APP_CLIENT_ID,
    AWS_COGNITO_SECRET_HASH:process.env.AWS_COGNITO_SECRET_HASH
  },
};

export default config;
