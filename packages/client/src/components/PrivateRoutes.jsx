import { useContext } from "react";
import { AccountContext } from "./AccountContext";

const { Outlet, Navigate } = require("react-router");

// needs to be in separate file?
const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
