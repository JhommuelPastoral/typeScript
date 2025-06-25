export interface UserCredentials {
  email: string;
  password: string;
}

export interface CreateUserCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}