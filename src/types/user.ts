export interface User {
  id: number;
  name: string;
  token: string;
}

export interface UserAuth {
  error: boolean;
  user: { id: number; name: string; token: string };
}
export interface UserAuthError {
  error: boolean;
  message: string;
}

export type SignInInput = {
  user: string;
  password: string;
};
