import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

const config = {
  SERVER: {
    PORT: process.env.PORT,
  }
};

export default config;
