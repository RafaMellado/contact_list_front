export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  exp: string;
}
