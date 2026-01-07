import Navbar from "@/components/layout/Navbar";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import React from "react";

type TProps = {
  children: React.ReactNode;
};
const layout = ({ children }: TProps) => {
  return (
    <>
      <PrivateRoute>
        <Navbar />
        {children}
      </PrivateRoute>
    </>
  );
};

export default layout;
