import styles from "./Sidebar.module.css";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";
import { AppStore } from "../../Redux/store";
import { PrivateRoutes } from "../../models/routes";

const Sidebar = () => {
  const userState = useSelector((store: AppStore) => store.user);

  return (
    <div className={styles.navItemsContainer}>
      <NavItem
        Icon={
          PrivateRoutes.HOME[userState.rol as keyof typeof PrivateRoutes.HOME]
            .icon
        }
        label={
          PrivateRoutes.HOME[userState.rol as keyof typeof PrivateRoutes.HOME]
            .label
        }
        to={
          PrivateRoutes.HOME[userState.rol as keyof typeof PrivateRoutes.HOME]
            .route
        }
      />
      {Object.values(
        PrivateRoutes[userState.rol as keyof typeof PrivateRoutes]
      ).map((route, key) => {
        return (
          route.icon && (
            <NavItem
              key={key}
              Icon={route.icon}
              label={route.label}
              to={route.route}
            />
          )
        );
      })}
      {(userState.rol == "M" || userState.rol == "P") &&
        Object.values(
          PrivateRoutes.PM
        ).map((route, key) => {
          return (
            route.icon && (
              <NavItem
                key={key}
                Icon={route.icon}
                label={route.label}
                to={route.route}
              />
            )
          );
        })}
      <NavItem
        Icon={PrivateRoutes.SETTINGS.icon}
        label={PrivateRoutes.SETTINGS.label}
        to={PrivateRoutes.SETTINGS.route}
      />
    </div>
  );
};

export default Sidebar;
