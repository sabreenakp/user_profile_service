import AWS from "aws-sdk";
import crypto from "crypto";
import config from "../utils/config";
import { ResponseData } from "../interfaces/user.interface";

export default class Cognito {
  private config = {
    apiVersion: "2016-04-18",
    region: config.AWS.AWS_REGION,
  };
  private secretHash = config.AWS.AWS_COGNITO_SECRET_HASH as string;
  private clientId = config.AWS.AWS_COGNTIO_APP_CLIENT_ID as string;

  private cognitoIdentity;

  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
  }

  public async signUpUser(
    email: string,
    password: string,
    userAttr: Array<any>
  ): Promise<ResponseData> {
    var params = {
      ClientId: this.clientId /* required */,
      Password: password /* required */,
      Username: email /* required */,
      SecretHash: this.hashSecret(email),
      UserAttributes: userAttr,
    };
    try {
      const data = await this.cognitoIdentity.signUp(params).promise();
      const response: ResponseData = {
        status: true,
        message: "Success",
        statusCode: 200,
        data: data,
      };
      return response;
    } catch (error) {
      const response: ResponseData = {
        status: false,
        message: "Please try again",
        statusCode: 500,
        error,
      };
      return response;
    }
  }
  public async signInUser(
    email: string,
    password: string
  ): Promise<ResponseData> {
    var params = {
      AuthFlow: "USER_PASSWORD_AUTH" /* required */,
      ClientId: this.clientId /* required */,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: this.hashSecret(email),
      },
    };
    try {
      let data = await this.cognitoIdentity.initiateAuth(params).promise();
      const response: ResponseData = {
        status: true,
        message: "Success",
        statusCode: 200,
        data: { token: data.AuthenticationResult?.AccessToken },
      };
      return response;
    } catch (error) {
      const response: ResponseData = {
        status: false,
        message: "Please try again",
        statusCode: 500,
        error,
      };
      return response;
    }
  }
  public async confirmSignUp(
    email: string,
    code: string
  ): Promise<ResponseData> {
    var params = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      Username: email,
      SecretHash: this.hashSecret(email),
    };
    try {
      const data = await this.cognitoIdentity.confirmSignUp(params).promise();
      const response: ResponseData = {
        status: true,
        message: "Success",
        statusCode: 200,
        data: data,
      };
      return response;
    } catch (error) {
      const response: ResponseData = {
        status: false,
        message: "Please try again",
        statusCode: 500,
        error,
      };
      return response;
    }
  }
  private hashSecret(email: string): string {
    return crypto
      .createHmac("SHA256", this.secretHash)
      .update(email + this.clientId)
      .digest("base64");
  }
}
