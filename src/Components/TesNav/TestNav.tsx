import { Link } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";

const TestNav = () => {
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
      </ul>
    </nav>
  );
};
export default TestNav;
