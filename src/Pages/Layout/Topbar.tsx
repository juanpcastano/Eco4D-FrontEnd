import { Navigate } from "react-router-dom";
import styles from "./Topbar.module.css";
import { useSelector } from "react-redux";
import { AppStore } from "../../Redux/store";
const Topbar = ({ logoutFn }: { logoutFn: () => void }) => {
  const userState = useSelector((store: AppStore) => store.user);
  return (
    <div className={styles.TopbarContainer}>
      <div className={styles.logoContainer} onClick={()=>{<Navigate to="/history"/>}}>
        <img
          src="https://eco4dimg.blob.core.windows.net/public-eco4d/Logo.png" 
          alt="Eco4D Logo"
          className={styles.logo}
        />
        <h2>Eco4D</h2>
      </div>

      <img
        src={userState.url_foto_de_perfil || "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ3ecoYCIXbBsczNsN0icdz3oUUQEivp59Ugghl0AQBSJskziDV"}
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
