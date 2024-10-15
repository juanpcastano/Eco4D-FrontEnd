import { Link } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";
import { useSelector } from "react-redux";
import { AppStore } from "../../Redux/store";

const TestNav = () => {
  const user = useSelector((state: AppStore) => state.user);

  return (
    <nav>
      <ul>
        <li>
          <Link to={PrivateRoutes.HISTORY}>HISTORY</Link>
        </li>
        <li>
          <Link to={PrivateRoutes.ECOGRAPHY}>ECOGRAPHY</Link>
        </li>
        <li>
          <Link to={PrivateRoutes.PROFILE}>PROFILE</Link>
        </li>
        <li>
          <Link to={PrivateRoutes.SETTINGS}>SETTINGS</Link>
        </li>
        {user.role == "patient" && (
          <li>
            <Link to={PrivateRoutes.PATIENT.SUPPORT}>SUPPORT</Link>
          </li>
        )}
        {user.role == "doctor" && (
          <li>
            <Link to={PrivateRoutes.DOCTOR.CREATE_ECOGRAPHY}>
              CREATE ECOGRAPHY
            </Link>
          </li>
        )}
        {user.role == "admin" && (
          <>
            <li>
              <Link to={PrivateRoutes.ADMIN.ANALYTICS}>ANALYTICS</Link>
            </li>
            <li>
              <Link to={PrivateRoutes.ADMIN.REQUESTS}>REQUESTS</Link>
            </li>
            <li>
              <Link to={PrivateRoutes.ADMIN.REQUEST}>REQUEST</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default TestNav;
