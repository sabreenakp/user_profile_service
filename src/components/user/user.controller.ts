import { Request, Response } from "express";
import { ResponseData, UserData } from "../../interfaces/user.interface";
import Joi from "joi";
import { joiValidation } from "../../utils/validation";
import * as userService from "./user.service";

export const addUser = async (req: Request, res: Response) => {
  try {
    const userData: UserData = req.body;
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
    });
    // pattern(/^[0-9]+$/).
    const validation: ResponseData = await joiValidation(schema, userData);
    if (!validation.status) {
      return res.json(validation);
    }
    const response: ResponseData = await userService.addUser(userData);
    return res.json(response);
  } catch (error) {
    return res.json(error);
  }
};
