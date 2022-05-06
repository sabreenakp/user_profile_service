import { ResponseData, UserData } from "../../interfaces/user.interface";
import { User } from "../../services/database.service";

export const verifyPhone = async (
  country_code: string,
  phone_number: string
) => {
  let responseData: ResponseData;
  try {
    const result = await User.findOne({
      country_code: country_code,
      phone_number: phone_number,
    });
    responseData = {
      status: true,
      message: "success",
      statusCode: 200,
      data: result,
    };
    return responseData;
  } catch (error) {
    responseData = {
      message: "Please try again",
      statusCode: 500,
      status: false,
      error,
    };
    return responseData;
  }
};
export const addUser = async (userData: UserData) => {
  let responseData: ResponseData;
  try {
    const user = new User(userData);
    const result = await user.save();
    responseData = {
      status: true,
      message: "success",
      statusCode: 200,
      data: result,
    };
    return responseData;
  } catch (error) {
    responseData = {
      message: "Please try again",
      statusCode: 500,
      status: false,
      error,
    };
    return responseData;
  }
};
