import { useSelector } from "react-redux";
import { AppStore } from "../Redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes} from "../models/routes";

const RoleGuard = ({role = ""}) => {
  const authState = useSelector((store: AppStore) => store.user);
  return authState.rol == role ? <Outlet /> : <Navigate to={PrivateRoutes.HISTORY.route} />;
};
export default RoleGuard;
