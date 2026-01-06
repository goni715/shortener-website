import PublicRoute from "@/components/PublicRoute/PublicRoute";
import React from "react";

type TProps = {
  children: React.ReactNode;
};
const layout = ({ children }: TProps) => {
  return (
    <>
      <PublicRoute>
        {children}
      </PublicRoute>
    </>
  );
};

export default layout;
