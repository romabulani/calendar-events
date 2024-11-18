export interface IUser {
  id: string;
  email: string;
}

export interface IAuthUser {
  email: string;
  password: string;
}

export interface IAuthResponse {
  message: string;
  user: {
    token: string;
    _id: string;
    email: string;
  };
}
