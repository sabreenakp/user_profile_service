import { Schema } from "mongoose";
import { UserData } from "../interfaces/user.interface";

export const userSchema = new Schema<UserData>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  country_code: { type: String, required: true },
  phone_number: { type: String, required: true },
  summary: { type: String },
  file_path: { type: String, required: true },
});
