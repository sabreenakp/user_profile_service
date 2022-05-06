import { UserData, ResponseData } from "../../interfaces/user.interface";
import * as userDal from "./user.dal";

export const addUser = async (userData: UserData) => {
  try {
    const user: ResponseData = await userDal.verifyPhone(
      userData.country_code,
      userData.phone_number
    );
    if (user.data) {
      return {
        message: "User Already Exist",
        status: false,
        statusCode: 500,
      };
    }
    const response: ResponseData = await userDal.addUser(userData);
    return response;
  } catch (error: any) {
    return {
      message: error.message,
      status: false,
      statusCode: 500,
    };
  }
};
