import { useSelector } from "react-redux";
import { AppStore } from "../Redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../models/routes";

const AuthGuard = () => {
  const authState = useSelector((store: AppStore) => store.auth);
  return authState.token ? <Outlet /> : <Navigate to={PublicRoutes.LOGIN} />;
};
export default AuthGuard;
