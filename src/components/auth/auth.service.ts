import {
    UserData,
    ResponseData,
    UserInputData,
    verifyIData,
    signinIData,
  } from "../../interfaces/user.interface";
  import * as userDal from "../user/user.dal";
  import { uploadFile } from "../../services/fileupload.service";
  import Cognito from "../../services/cognito.service";
  let cognitoService = new Cognito();

  export const addUser = async (userInputData: UserInputData) => {
    try {
      const user: ResponseData = await userDal.verifyPhone(
        userInputData.country_code,
        userInputData.phone_number
      );
      if (user.data) {
        return {
          message: "Phone number exist,Please try with a new one!",
          status: false,
          statusCode: 500,
        };
      }
      let userAttr = [];
      userAttr.push({ Name: "email", Value: userInputData.email });
      userAttr.push({ Name: "name", Value: userInputData.name });
      userAttr.push({
        Name: "phone_number",
        Value: userInputData.country_code + userInputData.phone_number,
      });
      const cognitoResponse: ResponseData = await cognitoService.signUpUser(
        userInputData.email,
        userInputData.password,
        userAttr
      );
      if (!cognitoResponse.status) return cognitoResponse;
      const fileUploadResponse: ResponseData = await uploadFile(
        userInputData.file_name,
        userInputData.file_data
      );
      if (fileUploadResponse.status) {
        const userData: UserData = {
          name: userInputData.name,
          email: userInputData.email,
          country_code: userInputData.country_code,
          phone_number: userInputData.phone_number,
          summary: userInputData.summary,
          file_path: fileUploadResponse.data,
        };
        const response: ResponseData = await userDal.addUser(userData);
        return response;
      }
      return fileUploadResponse;
    } catch (error: any) {
      return {
        message: error.message,
        status: false,
        statusCode: 500,
      };
    }
  };

  export const confirmSignUp = async (userData: verifyIData) => {
    try {
      const cognitoResponse: ResponseData = await cognitoService.confirmSignUp(
        userData.email,
        userData.code
      );
      return cognitoResponse;
    } catch (error: any) {
      return {
        message: error.message,
        status: false,
        statusCode: 500,
      };
    }
  };

  export const signin = async (userData: signinIData) => {
    try {
      const cognitoResponse: ResponseData = await cognitoService.signInUser(
        userData.email,
        userData.password
      );
      if (!cognitoResponse.status) return cognitoResponse;
      const response: ResponseData = await userDal.fetchUserByEmail(userData);
      if (!response.data) {
        return {
          message: "User Not Exist",
          status: false,
          statusCode: 500,
        };
      }
      cognitoResponse.data._id = response.data._id;
      return cognitoResponse;
    } catch (error: any) {
      return {
        message: error.message,
        status: false,
        statusCode: 500,
      };
    }
  };
