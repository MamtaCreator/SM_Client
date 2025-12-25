export interface LoginRequest {
  role: string;
  email?: string;
  schoolID?: number;
  studentID?: string;
  password: string;
}
