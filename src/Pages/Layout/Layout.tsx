import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { resetAuth } from "../../Redux/States/auth";
import { resetUser } from "../../Redux/States/user";
import TestNav from "../../Components/TestNav/TestNav";

const Layout = () => {
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      dispatch(resetAuth());
      dispatch(resetUser());
    } catch (error) {}
  };
  return (
    <div>
      hola soy el layout de la app (debo aparecer en todas las rutas menos el
      login)
      <TestNav />
      <Outlet />
      <button onClick={()=>{logout()}}>
        logout
      </button>
    </div>
  );
};
export default Layout;
