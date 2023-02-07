import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

type AuthProps = {
  children: React.ReactElement;
};
export const RequireAuth = ({ children }: AuthProps) => {
  const result = useAuth(); //consume the context
  const authData = result?.authData;
  const location = useLocation();

  console.log("Require Auth says hello ", authData?.name);
  console.log("THIS IS AUTH DATA", authData);
  if (!authData?.name) {
    console.log("No USER!!!!!");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
