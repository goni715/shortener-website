import { jwtDecode } from "jwt-decode";
import { SuccessToast } from "./ValidationHelper";
import { IAuthUser } from "@/types/global.type";

class SessionHelper {
  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("token");
    }
    return "";
  }

  getUserInfo() {
    const token = getToken();
    if (token) {
      const decodedData = jwtDecode(token) as IAuthUser;
      return decodedData;
    }
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.clear();
      window.location.href = "/";
    }
  }

  isLoggedIn() {
    const token = getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  setVerifyEmail(email: string) {
    localStorage.setItem("verifyEmail", email);
  }

  getVerifyEmail() {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("verifyEmail");
    }
  }

  setOtp(otp: string) {
    localStorage.setItem("otp", otp);
  }

  getOtp() {
    return localStorage.getItem("otp");
  }

  logout() {
    localStorage.clear();
    SuccessToast("Logout Successfull");
    window.location.href = "/";
  }
}

export const {
  setToken,
  getToken,
  setVerifyEmail,
  getUserInfo,
  getVerifyEmail,
  setOtp,
  getOtp,
  logout,
  isLoggedIn,
} = new SessionHelper();
