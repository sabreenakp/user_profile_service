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
};

export default config;
