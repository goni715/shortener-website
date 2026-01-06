"use client";

import { SetRegisterError } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../form/CustomInput";
import PasswordStrength from "../validation/PasswordStrength";
import FormError from "../validation/FormError";
import SubmitButton from "../form/SubmitButton";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { registerSchema, TRegisterFormValues } from "@/schema/auth.schema";


const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { registerError } = useAppSelector((state) => state.auth);
  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const { handleSubmit, control, watch, trigger } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password");

  useEffect(() => {
    if (password) {
      // Only trigger validation if confirmPassword has been entered
      const confirmPassword = watch("confirmPassword");
      if (confirmPassword) {
        trigger("confirmPassword");
      }
    }
  }, [password, watch, trigger]);

  //if register is success
  useEffect(() => {
    if (isSuccess) {
      router.push("/verify-account-otp");
    }
  }, [isSuccess, router]);

  const onSubmit: SubmitHandler<TRegisterFormValues> = (data) => {
    dispatch(SetRegisterError(""));
    register(data);
  };


  return (
    <>
      {registerError && <FormError message={registerError} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput
          label="Full Name"
          name="fullName"
          type="text"
          control={control}
          placeholder="Enter full name"
        />
        <CustomInput
          label="Email"
          name="email"
          type="text"
          control={control}
          placeholder="Enter email address"
        />
        <CustomInput
          label="Password"
          name="password"
          type="password"
          control={control}
          placeholder="Enter password"
        />
        {password && <PasswordStrength password={password} />}
        <CustomInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          control={control}
          placeholder="Enter confirm password"
        />
        <SubmitButton isLoading={isLoading}> Sign Up </SubmitButton>
      </form>
    </>
  );
};

export default RegisterForm;
