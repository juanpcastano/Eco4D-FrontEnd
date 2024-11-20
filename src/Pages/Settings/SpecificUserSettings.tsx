import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Settings.module.css';
import Eco4DApi from '../../api/Eco4DApi';
import { UserInfo } from '../../models/user.model';
import { ApiCallObtenerUsuarioPorId } from '../../services/apiDataService';

async function ApiCallPerfil(userData: Partial<UserInfo>): Promise<UserInfo> {
  const response = await Eco4DApi.put('/usuarios/perfil', userData);
  return response.data;
}

export default function SpecificUserSettings() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await ApiCallObtenerUsuarioPorId(id || "");
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await Eco4DApi.put('/usuarios/foto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to upload image');
      }

      const result = response.data;
      setUser(prevUser => prevUser ? {...prevUser, url_foto_de_perfil: result} : null);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setUser(prevUser => prevUser ? {...prevUser, [id]: value} : null);
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const updatedUser = await ApiCallPerfil(user);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

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
    if (!user) return <div>No se encontraron datos del usuario</div>;

    return (
      <div className={styles.profileContainer}>
        <div className={styles.avatarContainer}>
          <img 
            src={user.url_foto_de_perfil || "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ3ecoYCIXbBsczNsN0icdz3oUUQEivp59Ugghl0AQBSJskziDV"} 
            alt="Profile" 
            className={styles.avatar} 
          />
          <button 
            className={styles.editButton} 
            onClick={handleEditClick} 
            disabled={isUploading}
            type="button"
          >
            {isUploading ? <LoadingIcon /> : <PencilIcon />}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formLayout}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="nombre_completo">Tu nombre</label>
              <input className={styles.input} id="nombre_completo" value={user.nombre_completo} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="identificacion">Número de identificación</label>
              <div className={styles.idContainer}>
                <input className={styles.input} id="identificacion" value={user.identificacion} onChange={handleInputChange} />
                <select className={styles.select} id="tipoIdentificacion" value={user.tipoIdentificacion} onChange={handleInputChange}>
                  <option value="CC">C.C.</option>
                  <option value="CE">C.E.</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="correo_electronico">Email</label>
              <input className={styles.input} id="correo_electronico" type="email" value={user.correo_electronico} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="ciudad">Ciudad</label>
              <select className={styles.select} id="ciudad" value={user.ciudad} onChange={handleInputChange}>
                <option value="Bogotá">Bogotá</option>
                <option value="Medellín">Medellín</option>
                <option value="Cali">Cali</option>
                <option value="Barranquilla">Barranquilla</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
              <input 
                className={styles.input} 
                id="fecha_nacimiento" 
                type="date" 
                value={new Date(user.fecha_nacimiento).toISOString().split('T')[0]}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="pais">País</label>
              <select className={styles.select} id="pais" value={user.pais} onChange={handleInputChange}>
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <button className={styles.button} onClick={handleSave} disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
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

function LoadingIcon() {
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
      className={styles.loadingIcon}
    >
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  );
}