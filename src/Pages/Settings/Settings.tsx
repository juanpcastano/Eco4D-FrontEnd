import { useState} from 'react';
import styles from './Settings.module.css';
import { useSelector } from 'react-redux';
import { AppStore } from '../../Redux/store';



export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('preferences');

  const userData = useSelector((store: AppStore) => store.user);
  const renderPreferences = () => (
    <div>
      <div className={styles.formLayout}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="language">Idioma</label>
          <select className={styles.select} id="language" defaultValue="spanish">
            <option value="spanish">Español</option>
            <option value="english">English</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="timezone">Zona Horaria</label>
          <select className={styles.select} id="timezone" defaultValue="gmt-5">
            <option value="gmt-5">(GMT-5:00) Bogotá, Lima, Quito</option>
            <option value="gmt-4">(GMT-4:00) Caracas, La Paz</option>
            <option value="gmt-3">(GMT-3:00) Buenos Aires, Georgetown</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => {
    if (!userData) return <div>No se encontraron datos del usuario</div>;

    return (
      <div className={styles.profileContainer}>
        <div className={styles.avatarContainer}>
          <img src={userData.url_foto_de_perfil || "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ3ecoYCIXbBsczNsN0icdz3oUUQEivp59Ugghl0AQBSJskziDV"} alt="Profile" className={styles.avatar} />
          <button className={styles.editButton}>
            <PencilIcon />
          </button>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formLayout}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">Tu nombre</label>
              <input className={styles.input} id="name" defaultValue={userData.nombre_completo} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="id">Número de identificación</label>
              <div className={styles.idContainer}>
                <input className={styles.input} id="id" defaultValue={userData.identificacion} />
                <select className={styles.select} defaultValue={userData.tipoIdentificacion}>
                  <option value="CC">C.C.</option>
                  <option value="CE">C.E.</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input className={styles.input} id="email" type="email" defaultValue={userData.correo_electronico} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="city">Ciudad</label>
              <select className={styles.select} id="city" defaultValue={userData.ciudad}>
                <option value="Bogotá">Bogotá</option>
                <option value="Medellín">Medellín</option>
                <option value="Cali">Cali</option>
                <option value="Barranquilla">Barranquilla</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="birthdate">Fecha de nacimiento</label>
              <input 
                className={styles.input} 
                id="birthdate" 
                type="date" 
                defaultValue={new Date(userData.fecha_nacimiento).toISOString().split('T')[0]} 
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="country">País</label>
              <select className={styles.select} id="country" defaultValue={userData.pais}>
                <option value="Colombia">Colombia</option>
                <option value="México">México</option>
                <option value="Argentina">Argentina</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.tabList}>
          <div
            className={`${styles.tab} ${activeTab === 'preferences' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <span className={styles.span}>Preferencias</span>
            <div className={`${styles.decorator} ${activeTab === 'preferences' ? styles.decoratorActive : ''}`}></div>
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'profile' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            
            <span className={styles.span}>Mi Perfil</span>
            <div className={`${styles.decorator} ${activeTab === 'profile' ? styles.decoratorActive : ''}`}></div>
          </div>
        </div>
        <div className={styles.content}>
          {activeTab === 'preferences' ? renderPreferences() : renderProfile()}
        </div>
      </div>
      <div className={styles.saveButtonContainer}>
        <button className={styles.button}>Guardar</button>
      </div>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}