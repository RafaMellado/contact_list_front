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

export interface SignUpError {
  errors: {
    username: Array<{ error: string; value?: string; count?: number }>;
    email: Array<{ error: string; value: string }>;
    password: Array<{ error: string; value?: string; count?: number }>;
    password_confirmation: Array<{ error: string; attribute: string }>;
  };
}
