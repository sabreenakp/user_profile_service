import { Request, Response } from "express";
import {
  FetchUserIData,
  ResponseData,
  UserInputData,
  verifyIData,
} from "../../interfaces/user.interface";
import Joi from "joi";
import { joiValidation } from "../../utils/validation";
import * as userService from "./user.service";

export const addUser = async (req: Request, res: Response) => {
  try {
    const userInputData: UserInputData = req.body;
    const fileData: any = req.files;
    userInputData.file_data = fileData.file.data;
    userInputData.file_name = fileData.file.name;
    /*  to validate the data using joi validation */
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).required().label("Name"),
      email: Joi.string().email().required().label("Email ID"),
      country_code: Joi.string()
        .min(1)
        .max(10)
        .required()
        .label("Country Code"),
      phone_number: Joi.string().max(20).required().label("Phone Number"),
      summary: Joi.string().label("Summary"),
      file_name: Joi.string().required().label("File Name"),
      file_data: Joi.any().required().label("File Data"),
      password: Joi.string().required().label("Password"),
    });
    const validation: ResponseData = await joiValidation(schema, userInputData);
    if (!validation.status) {
      return res.json(validation);
    }
    const response: ResponseData = await userService.addUser(userInputData);
    return res.json(response);
  } catch (error) {
    return res.json(error);
  }
};

export const fetchUser = async (req: Request, res: Response) => {
  try {
    const userData: FetchUserIData = { id: req.params.id };
    /*  to validate the data using joi validation */
    const schema = Joi.object({
      id: Joi.string().required().label("User Id"),
    });
    const validation: ResponseData = await joiValidation(schema, userData);
    if (!validation.status) {
      return res.json(validation);
    }
    const response: ResponseData = await userService.fetchUser(userData);
    return res.json(response);
  } catch (error) {
    return res.json(error);
  }
};

export const confirmSignUp = async (req: Request, res: Response) => {
  try {
    const userData: verifyIData = req.body;
    /*  to validate the data using joi validation */
    const schema = Joi.object({
      email: Joi.string().email().required().label("Email ID"),
      password: Joi.string().min(6).required().label("Password"),
    });
    const validation: ResponseData = await joiValidation(schema, userData);
    if (!validation.status) {
      return res.json(validation);
    }
    const response: ResponseData = await userService.confirmSignUp(userData);
    return res.json(response);
  } catch (error) {
    return res.json(error);
  }
};
