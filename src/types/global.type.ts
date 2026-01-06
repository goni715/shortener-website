
export interface ApiError {
  status: number;
  data?: {
    message?: string;
  };
}

export type IAuthUser = {
  userId: string;
  iat: number;
  email: string;
  fullName: string;
  profileImg: string;
  role: "user" | "admin";
};