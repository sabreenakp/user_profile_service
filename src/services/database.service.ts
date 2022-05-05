import { model, connect } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { userSchema } from "../models/user.model";
import config from "../utils/config";

//Create a User Model.
const User = model<IUser>("User", userSchema);
run()
export async function run() {
    try{
        // Connect to MongoDB
        await connect(config.DATABASE.HOST + config.DATABASE.NAME);
    }catch(err){
        console.log(err)
    }
}
