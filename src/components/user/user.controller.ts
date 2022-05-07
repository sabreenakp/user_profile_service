import { Request, Response } from "express";
import {
  FetchUserIData,
  ResponseData
} from "../../interfaces/user.interface";
import Joi from "joi";
import { joiValidation } from "../../utils/validation";
import * as userService from "./user.service";

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