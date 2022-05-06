export interface ResponseData {
  status: boolean;
  message: string;
  data?: any;
  statusCode: number;
  error?: any;
}

export interface UserData {
  name: string;
  email: string;
  country_code: string;
  phone_number: string;
}
