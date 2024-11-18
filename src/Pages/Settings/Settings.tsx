import { useState } from 'react';
import styles from './Settings.module.css';

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('preferences');

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
          <select className={styles.select} id="timezone" defaultValue="gmt-12">
            <option value="gmt-12">(GMT-12:00) International Date Line West</option>
            <option value="gmt-11">(GMT-11:00) Midway Island, Samoa</option>
            <option value="gmt-10">(GMT-10:00) Hawaii</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className={styles.profileContainer}>
      <div className={styles.avatarContainer}>
        <img src="/placeholder.svg" alt="Profile" className={styles.avatar} />
        <button className={styles.editButton}>
          <PencilIcon />
        </button>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.formLayout}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Tu nombre</label>
            <input className={styles.input} id="name" defaultValue="Angela Tina" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="id">Número de identificación</label>
            <div className={styles.idContainer}>
              <input className={styles.input} id="id" defaultValue="103920492" />
              <select className={styles.select} defaultValue="cc">
                <option value="cc">C.C.</option>
                <option value="ce">C.E.</option>
              </select>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input className={styles.input} id="email" type="email" defaultValue="angelatina@gmail.com" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="city">Ciudad</label>
            <select className={styles.select} id="city" defaultValue="cali">
              <option value="cali">Cali</option>
              <option value="bogota">Bogotá</option>
              <option value="medellin">Medellín</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="birthdate">Fecha de nacimiento</label>
            <select className={styles.select} id="birthdate" defaultValue="1990-01-25">
              <option value="1990-01-25">25 January 1990</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="country">País</label>
            <select className={styles.select} id="country" defaultValue="colombia">
              <option value="colombia">Colombia</option>
              <option value="mexico">México</option>
              <option value="argentina">Argentina</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.tabList}>
          <div
            className={`${styles.tab} ${activeTab === 'preferences' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferencias
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'profile' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Mi Perfil
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