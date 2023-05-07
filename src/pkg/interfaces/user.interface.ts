export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  isAdmin?: boolean;
}

export interface IUserUseCaseResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IAdvancedFind {
  query: string;
  limit: number;
  page: number;
  filter?: string;
}
