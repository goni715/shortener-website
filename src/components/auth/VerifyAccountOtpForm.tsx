"use client";
import { SetVerifyAccountOtpError } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormError from "../validation/FormError";
import { getVerifyEmail } from "@/helpers/SessionHelper";
import { useVerifyAccountVerifyOtpMutation } from "@/redux/features/auth/authApi";
import SubmitButton from "../form/SubmitButton";

const VerifyAccountOtpForm = () => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [verifyEmail, setVerifyEmail] = useState<string | null>("");

  const dispatch = useAppDispatch();
  const { verifyAccountOtpError } = useAppSelector((state) => state.auth);
  const [verifyAccountVerifyOtp, { isLoading, isSuccess: verifySuccess }] =
    useVerifyAccountVerifyOtpMutation();

  useEffect(() => {
    // Simulate API call
    if (typeof window !== "undefined") {
      const emailFromStorage = localStorage.getItem("verifyEmail");
      if(emailFromStorage){
        setVerifyEmail(emailFromStorage);
      }
    }
  }, []);




  //if verify success
  useEffect(() => {
    if (verifySuccess) {
      localStorage.clear();
      router.push("/login");
    }
  }, [verifySuccess, router]);

  //handle verify
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(SetVerifyAccountOtpError(""));
    verifyAccountVerifyOtp({
      otp: verificationCode,
      email: getVerifyEmail(),
    });
  };




  return (
    <>
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Enter Verification Code
        </h1>
        <p className="text-gray-600">
          {`We've sent a 6-digit code to ${verifyEmail}`}
        </p>
      </div>
      {verifyAccountOtpError && <FormError message={verifyAccountOtpError} />}

      <div className="space-y-5">
        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Verification Code
            </label>
            <div className="relative mt-2">
              <input
                id="code"
                type="text"
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-center text-2xl font-mono tracking-widest"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>
          </div>

         <SubmitButton isLoading={isLoading} loadingTitle="Verifying"> Verify </SubmitButton>
        </form>
      </div>
    </>
  );
};

export default VerifyAccountOtpForm;
