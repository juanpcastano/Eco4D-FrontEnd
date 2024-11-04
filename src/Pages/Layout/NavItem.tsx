import { Link, useLocation } from "react-router-dom";
import styles from "./NavItem.module.css";
import { useEffect, useState } from "react";

const NavItem = ({
  Icon,
  label,
  to,
}: {
  Icon: string;
  label: string;
  to: string;
}) => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname == to);

  useEffect(() => {
    setActive(location.pathname === to);
  }, [location.pathname, to]);

  return (
    <Link to={`${to}`}>
      <div
        className={`${styles.navItem} ${
          active ? styles.active : styles.inactive
        }`}
      >
        <div
          className={`${styles.decorator} ${active && styles.decoratorActive}`}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <div className={styles.iconAndLabel}>
          <span
            className={`material-symbols-outlined ${
              active ? styles.activeIcon : styles.inactiveIcon
            }`}
          >
            {Icon}
          </span>

          <div className={active ? styles.labelActive : styles.labelInactive}>
            {label}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NavItem;
