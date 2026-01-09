export interface User {
  name?: string;
  email: string;
  Password: string;
  role?: string;
  SchoolName?: string;
  schoolID?: number;
  studentID?: string;
}


export interface LoginResponse {
  token: string;
}


export interface RegisterResponse {
  success: boolean;
  message: string;

}

