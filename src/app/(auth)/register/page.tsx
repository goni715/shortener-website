"use client"
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

const RegisterPage = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-3 sm:p-6">
      <div className="w-full max-w-2xl bg-white py-6 px-4 md:px-6 shadow-md rounded-md">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 text-center">
          Create an Account
        </h2>
        <RegisterForm/>
        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#3AB0FF] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
