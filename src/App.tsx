import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import AuthGuard from "./Guards/AuthGuard";
import { Provider } from "react-redux";
import store from "./Redux/store";

import { Suspense, lazy } from "react";
import Loading from "./Components/Loading/Loading";
import Register from "./Pages/Login/Register";
import Users from "./Pages/Users/Users";
import SpecificUser from "./Pages/Users/specificUser";

const NotFound = lazy(() => import("./Pages/Not found/NotFound"));
const Layout = lazy(() => import("./Pages/Layout/Layout"));
const History = lazy(() => import("./Pages/History/History"));
const Login = lazy(() => import("./Pages/Login/Login"));
const Ecography = lazy(() => import("./Pages/Ecography/Ecography"));
const Settings = lazy(() => import("./Pages/Settings/Settings"));
const RoleGuard = lazy(() => import("./Guards/RoleGuard"));
const Support = lazy(() => import("./Pages/Support/Support"));
const CreateEcography = lazy(() => import("./Pages/CreateEcograhy/CreateEcography"));
const Analytics = lazy(() => import("./Pages/Analytics/Analytics"));
const Requests = lazy(() => import("./Pages/Requests/Requests"));
const Request = lazy(() => import("./Pages/Request/Request"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Navigate to={PrivateRoutes.HISTORY.route} />}
              />
              <Route path={PublicRoutes.LOGIN.route} element={<Login />} />
              <Route path={PublicRoutes.REGISTER.route} element={<Register />} />
              <Route path="*" element={<NotFound />} />
              <Route element={<AuthGuard />}>
                <Route element={<Layout />}>
                  <Route path={PrivateRoutes.HISTORY.route} element={<History />} />
                  <Route
                    path="/ecography/:id"  // Cambiado para aceptar el parámetro ID
                    element={<Ecography />}
                  />
                  <Route path={PrivateRoutes.SETTINGS.route} element={<Settings />} />
                  <Route element={<RoleGuard role={["P","M"]} />}>
                    <Route
                      path={PrivateRoutes.PM.SUPPORT.route}
                      element={<Support />}
                    />
                    <Route
                      path={`${PrivateRoutes.PM.REQUEST.route}/:id`}
                      element={<Request />}
                    />
                  </Route>
                  <Route element={<RoleGuard role="M" />}>
                    <Route
                      path={PrivateRoutes.M.CREATE_ECOGRAPHY.route}
                      element={<CreateEcography />}
                    />
                    
                  </Route>
                  <Route element={<RoleGuard role="A" />}>
                    <Route
                      path={PrivateRoutes.HOME.A.route}
                      element={<Analytics />}
                    />
                    <Route
                      path={PrivateRoutes.A.REQUESTS.route}
                      element={<Requests />}
                    />
                    <Route
                      path={PrivateRoutes.A.USERS.route}
                      element={<Users />}
                    />
                    <Route
                      path="/user/:id"  // Cambiado para aceptar el parámetro ID
                      element={<SpecificUser />}
                    />
                    <Route
                      path={PrivateRoutes.A.REQUEST.route}
                      element={<Request />}
                    />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </>
  );
}

export default App;