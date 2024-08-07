import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectRoute = ({ children }) => {
  const jwtToken = Cookies.get("jwtToken");
  return jwtToken === undefined ? <Navigate to="/login" /> : children;
};

export default ProtectRoute;
