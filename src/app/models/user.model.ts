export interface User {
  name?: string;
  email: string;
  PasswordHash: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
}


export interface RegisterResponse {
  success: boolean;
  message: string;
}

