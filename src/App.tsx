import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./Pages/Not found/NotFound";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import AuthGuard from "./Guards/AuthGuard";
import Layout from "./Pages/Layout/Layout";
import History from "./Pages/History/History";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Login from "./Pages/Login/Login";
import TestNav from "./Components/TesNav/TestNav";
import Ecography from "./Pages/Ecography/Ecography";
import Profile from "./Pages/Profile/Profile";
import Settings from "./Pages/Settings/Settings";
import RoleGuardPatient from "./Guards/RoleGuardPatient";
import RoleGuardDoctor from "./Guards/RoleGuardDoctor";
import RoleGuardAdmin from "./Guards/RoleGuardAdmin";
import Support from "./Pages/Support/Support";
import CreateEcography from "./Pages/CreateEcograhy/CreateEcography";
import Analytics from "./Pages/Analytics/Analytics";
import Requests from "./Pages/Requests/Requests";
import Request from "./Pages/Request/Request";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <TestNav />
          <Routes>
            <Route path="/" element={<Navigate to={PrivateRoutes.HISTORY} />} />
            <Route path={PublicRoutes.LOGIN} element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<AuthGuard />}>
              <Route element={<Layout />}>
                <Route path={PrivateRoutes.HISTORY} element={<History />} />
                <Route path={PrivateRoutes.ECOGRAPHY} element={<Ecography />} />
                <Route path={PrivateRoutes.PROFILE} element={<Profile />} />
                <Route path={PrivateRoutes.SETTINGS} element={<Settings />} />
                <Route element={<RoleGuardPatient />}>
                  <Route
                    path={PrivateRoutes.PATIENT.SUPPORT}
                    element={<Support />}
                  />
                </Route>
                <Route element={<RoleGuardDoctor />}>
                  <Route
                    path={PrivateRoutes.DOCTOR.CREATE_ECOGRAPHY}
                    element={<CreateEcography />}
                  />
                </Route>
                <Route element={<RoleGuardAdmin />}>
                  <Route
                    path={PrivateRoutes.ADMIN.ANALYTICS}
                    element={<Analytics />}
                  />
                  <Route
                    path={PrivateRoutes.ADMIN.REQUESTS}
                    element={<Requests />}
                  />
                  <Route
                    path={PrivateRoutes.ADMIN.REQUEST}
                    element={<Request />}
                  />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
