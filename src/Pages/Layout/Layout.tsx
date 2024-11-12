import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { resetUser } from "../../Redux/States/user";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import styles from "./Layout.module.css";
import { ApiCallLogout } from "../../services/authService";

const Layout = () => {
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      ApiCallLogout();
      dispatch(resetUser());
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <div className={styles.layoutContainer}>
        <Topbar logoutFn={logout} />
        <Sidebar />
        <div className={styles.contentBackground}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Layout;
