import { useSelector } from "react-redux";
import { AppStore } from "../Redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes } from "../models/routes";

// Definimos el tipo para las props
interface RoleGuardProps {
  role: string | string[];
}

const RoleGuard = ({ role }: RoleGuardProps) => {
  const userState = useSelector((store: AppStore) => store.user);
  
 
  if (Array.isArray(role)) {
    return role.includes(userState.rol) 
      ? <Outlet />
      : <Navigate to={PrivateRoutes.HISTORY.route} />;
  }

  return userState.rol === role 
    ? <Outlet />
    : <Navigate to={PrivateRoutes.HISTORY.route} />;
};

export default RoleGuard;
