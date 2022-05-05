export interface ResponseData {
  status: boolean;
  message: string;
  data?: any;
  statusCode: number;
}

export interface IUser{
  name: string;
  email: string;
  avatar?: string;
}

export interface UserData {
  id?: string;
  name: string;
  email: string;
  country_code:string;
  phone_number: string;
  createdBy?: string;
  updatedBy?: string;
}
