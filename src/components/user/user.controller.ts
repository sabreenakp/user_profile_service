import { Request, Response } from "express";
import { ResponseData, UserData } from "../../interfaces/user.interface";
import Joi from "joi";
// import userService from './user.service';

export const addUser = async (userData: UserData, res: Response) => {
  try {

  } catch (error) {
    return res.json(error);
  }
};
