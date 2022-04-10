export interface SignUpRequestBody {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface SignUpResponse {
  username: string;
  email: string;
}
