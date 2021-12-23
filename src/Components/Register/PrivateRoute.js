import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Global/AuthProvider";

const PrivateRoute = ({ children }) => {
  const currentUser = useContext(AuthContext);
  const Navigate = useNavigate();

  return currentUser ? children : <Navigate to="/reg" />;
};

export default PrivateRoute;
