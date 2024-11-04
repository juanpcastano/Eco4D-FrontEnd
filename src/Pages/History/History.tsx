import { useSelector } from "react-redux";
import { AppStore } from "../../Redux/store";
import { Navigate } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";

const History = () => {
  const userState = useSelector((store: AppStore) => store.user);
  if (userState.rol=="A"){
    return <Navigate to={PrivateRoutes.HOME.A.route}/>
  }
  return (
    <>
      <div>Hola soy el historial de ecografías</div>
    </>
  );
};
export default History;
