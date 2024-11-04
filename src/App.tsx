import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import AuthGuard from "./Guards/AuthGuard";
import { Provider } from "react-redux";
import store from "./Redux/store";

import { Suspense, lazy } from "react";
import Loading from "./Components/Loading/Loading";
import Register from "./Pages/Login/Register";


const NotFound= lazy(()=>  import( "./Pages/Not found/NotFound"));
const Layout = lazy(()=> import("./Pages/Layout/Layout"));
const History = lazy(()=> import("./Pages/History/History"));
const Login = lazy(()=> import("./Pages/Login/Login"));
const Ecography = lazy(()=> import("./Pages/Ecography/Ecography"));
const Profile = lazy(()=> import("./Pages/Profile/Profile"));
const Settings = lazy(()=> import("./Pages/Settings/Settings"));
const RoleGuard = lazy(()=> import("./Guards/RoleGuard"));
const Support = lazy(()=> import("./Pages/Support/Support"));
const CreateEcography = lazy(()=> import("./Pages/CreateEcograhy/CreateEcography"));
const Analytics = lazy(()=> import("./Pages/Analytics/Analytics"));
const Requests = lazy(()=> import("./Pages/Requests/Requests"));
const Request = lazy(()=> import("./Pages/Request/Request"));

function App() {
  /* const userState = useSelector((store: AppStore) => store.user); */
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Navigate to={PublicRoutes.HISTORY.route} />}
              />
              <Route path={PublicRoutes.LOGIN.route} element={<Login />} />
              <Route path={PublicRoutes.REGISTER.route} element={<Register />} />
              <Route path="*" element={<NotFound />} />
              <Route element={<AuthGuard />}>
                <Route element={<Layout />}>
                  <Route path={PrivateRoutes.HISTORY.route} element={<History />} />
                  <Route
                    path={PrivateRoutes.ECOGRAPHY.route}
                    element={<Ecography />}
                  />
                  <Route path={PrivateRoutes.PROFILE.route} element={<Profile />} />
                  <Route path={PrivateRoutes.SETTINGS.route} element={<Settings />} />
                  <Route element={<RoleGuard role="P" />}>
                    <Route
                      path={PrivateRoutes.P.SUPPORT.route}
                      element={<Support />}
                    />
                  </Route>
                  <Route element={<RoleGuard role="D" />}>
                    <Route
                      path={PrivateRoutes.D.CREATE_ECOGRAPHY.route}
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
