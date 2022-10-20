export interface APIResponse {
  success: boolean;
  data?: any | null;
  message: string;
}

export interface UserTypes {
  name: string;
  nis: number;
  username: string;
  password: string;
  email: string;
  role: string;
}
