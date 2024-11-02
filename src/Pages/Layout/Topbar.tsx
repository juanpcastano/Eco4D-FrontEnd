import { Navigate } from "react-router-dom";
import styles from "./Topbar.module.css";
const Topbar = ({ logoutFn }: { logoutFn: () => void }) => {
  return (
    <div className={styles.TopbarContainer}>
      <div className={styles.logoContainer} onClick={()=>{<Navigate to="/history"/>}}>
        <img
          src="src\assets\logo.png" // Imagen de perfil
          alt="Eco4D Logo"
          className={styles.logo}
        />
        <h2>Eco4D</h2>
      </div>

      <img
        src="src\assets\exampleProfilePicture.jpg" // Imagen de perfil
        alt="Profile"
        onClick={() => {
          logoutFn();
        }}
        className={styles.profilePicture}
      />
    </div>
  );
};

export default Topbar;
