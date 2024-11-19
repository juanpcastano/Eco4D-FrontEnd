import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiCallObtenerAdministradores, ApiCallObtenerMedicos, ApiCallObtenerPacientes } from "../../services/apiDataService";
import Table from "../../Components/Table/Table";
import styles from "./Users.module.css";
import { AxiosError } from "axios";

const Users = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [medicos, setMedicos] = useState<any[]>([]);
  const [administradores, setAdministradores] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("P")
  useEffect(() => {
    const cargarPacientes = async () => {
      try {
        const data = await ApiCallObtenerPacientes();
        setPacientes(data);
        setIsLoading(false);
      } catch (error) {
        let AxiosErr = error as AxiosError;
        setError((AxiosErr.response?.data as { message: string }).message);
        if (
          (AxiosErr.response?.data as { message: string }).message ==
          "Token inválido o expirado"
        ) {
          navigate("/login");
        }
        console.error("Error al cargar pacientes:", error);
        setPacientes([]);
      }
    };

    cargarPacientes();
  }, [activeTab]);
  useEffect(() => {
    const cargarMedicos = async () => {
      try {
        const data = await ApiCallObtenerMedicos();
        setMedicos(data);
        setIsLoading(false);
      } catch (error) {
        let AxiosErr = error as AxiosError;
        setError((AxiosErr.response?.data as { message: string }).message);
        if (
          (AxiosErr.response?.data as { message: string }).message ==
          "Token inválido o expirado"
        ) {
          navigate("/login");
        }
        console.error("Error al cargar pacientes:", error);
        setMedicos([]);
      }
    };

    cargarMedicos();
  }, [activeTab]);
  useEffect(() => {
    const cargarAdministradores = async () => {
      try {
        const data = await ApiCallObtenerAdministradores();
        setAdministradores(data);
        setIsLoading(false);
      } catch (error) {
        let AxiosErr = error as AxiosError;
        setError((AxiosErr.response?.data as { message: string }).message);
        if (
          (AxiosErr.response?.data as { message: string }).message ==
          "Token inválido o expirado"
        ) {
          navigate("/login");
        }
        console.error("Error al cargar pacientes:", error);
        setAdministradores([]);
      }
    };

    cargarAdministradores();
  }, [activeTab]);

  useEffect(() => {
    const filterData = () => {
      if (activeTab === "P"){
        setData(pacientes)
      } else if (activeTab === "M"){
        setData(medicos)
      } else if (activeTab === "A"){
        setData(administradores)
      }
    };

    filterData();
  }, [activeTab]);
  
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loadingText}>Cargando pacientes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <span>{error}</span>
      </div>
    );
  }

  if (pacientes.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <span>No hay pacientes registrados en el sistema</span>
      </div>
    );
  }

  const headers = ["Id", "Nombre", "Correo", ""];
  const keys = ["identificacion", "nombre_completo", "correo_electronico"];
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.tabList}>
            <div
              className={`${styles.tab} ${activeTab === 'P' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('P')}
            >
              <span className={styles.span}>Pacientes</span>
              <div className={`${styles.decorator} ${activeTab === 'P' ? styles.decoratorActive : ''}`}></div>
            </div>
            <div
              className={`${styles.tab} ${activeTab === 'M' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('M')}
            >
              <span className={styles.span}>Médicos</span>
              <div className={`${styles.decorator} ${activeTab === 'M' ? styles.decoratorActive : ''}`}></div>
            </div>
            <div
              className={`${styles.tab} ${activeTab === 'A' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('A')}
            >
              <span className={styles.span}>Administradores</span>
              <div className={`${styles.decorator} ${activeTab === 'A' ? styles.decoratorActive : ''}`}></div>
            </div>
          </div>
          <div className={styles.content}>
            <Table
              data={data}
              headers={headers}
              keys={keys}
              pathLink="/perfil"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
