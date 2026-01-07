"use client";
import CustomInput from "../form/CustomInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../form/SubmitButton";
import { SetLoginError } from "@/redux/features/auth/authSlice";
import FormError from "../validation/FormError";
import { loginSchema, TLoginFormValues } from "@/schema/auth.schema";




const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { loginError } = useAppSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const {handleSubmit, control } = useForm({
        resolver: zodResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<TLoginFormValues> = (data) => {
    dispatch(SetLoginError(""))
    login(data)
  };


  return (
    <>
      {loginError && <FormError message={loginError} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput label="Email" name="email" type="text" control={control} placeholder="Enter email address"/>
        <CustomInput label="Password" name="password" type="password" control={control} placeholder="Enter your password"/>

        <div className="flex justify-end items-center">
          <span
            className="text-sm text-[#3AB0FF] hover:underline"
          >
            Forgot password?
          </span>
        </div>
        <SubmitButton isLoading={isLoading}> Sign In </SubmitButton>
      </form>
    </>
  );
};

export default LoginForm;
