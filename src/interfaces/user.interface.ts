export interface ResponseData {
  status: boolean;
  message: string;
  data?: any;
  statusCode: number;
  error?: any;
}

export interface UserInputData {
  name: string;
  email: string;
  country_code: string;
  phone_number: string;
  summary: string;
  file_name: string;
  file_data: string;
  password: string;
}

export interface UserData {
  name: string;
  email: string;
  country_code: string;
  phone_number: string;
  summary: string;
  file_path: string;
}

export interface FetchUserIData {
  id: string;
}

export interface verifyIData {
  email: string;
  code: string;
}

export interface signinIData {
  email: string;
  password: string;
}
