import { useSelector } from "react-redux";
import { AppStore } from "../Redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes} from "../models/routes";

const RoleGuardAdmin = ({role = ""}) => {
  const authState = useSelector((store: AppStore) => store.user);
  return authState.role == role ? <Outlet /> : <Navigate to={PrivateRoutes.HISTORY} />;
};
export default RoleGuardAdmin;
