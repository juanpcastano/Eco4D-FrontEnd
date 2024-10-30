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
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Navigate to={PrivateRoutes.HISTORY} />}
              />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.REGISTER} element={<Register />} />
              <Route path="*" element={<NotFound />} />
              <Route element={<AuthGuard />}>
                <Route element={<Layout />}>
                  <Route path={PrivateRoutes.HISTORY} element={<History />} />
                  <Route
                    path={PrivateRoutes.ECOGRAPHY}
                    element={<Ecography />}
                  />
                  <Route path={PrivateRoutes.PROFILE} element={<Profile />} />
                  <Route path={PrivateRoutes.SETTINGS} element={<Settings />} />
                  <Route element={<RoleGuard role="patient" />}>
                    <Route
                      path={PrivateRoutes.PATIENT.SUPPORT}
                      element={<Support />}
                    />
                  </Route>
                  <Route element={<RoleGuard role="doctor" />}>
                    <Route
                      path={PrivateRoutes.DOCTOR.CREATE_ECOGRAPHY}
                      element={<CreateEcography />}
                    />
                  </Route>
                  <Route element={<RoleGuard role="admin" />}>
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
      </Suspense>
    </>
  );
}

export default App;
