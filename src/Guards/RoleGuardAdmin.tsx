import { useSelector } from "react-redux";
import { AppStore } from "../Redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes} from "../models/routes";

const RoleGuardAdmin = () => {
  const authState = useSelector((store: AppStore) => store.user);
  return authState.role == "admin" ? <Outlet /> : <Navigate to={PrivateRoutes.HISTORY} />;
};
export default RoleGuardAdmin;
