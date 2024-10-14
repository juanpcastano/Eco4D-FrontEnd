import { useSelector } from "react-redux";
import { AppStore } from "../Redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes} from "../models/routes";

const RoleGuardDoctor = () => {
  const authState = useSelector((store: AppStore) => store.user);
  return authState.role == "doctor" ? <Outlet /> : <Navigate to={PrivateRoutes.HISTORY} />;
};
export default RoleGuardDoctor;
