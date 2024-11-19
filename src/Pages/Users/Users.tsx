import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiCallObtenerPacientes } from "../../services/apiDataService";
import Table from "../../Components/Table/Table";
import styles from "./Users.module.css";
import { AxiosError } from "axios";

const Users = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<any[]>([]);
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
  }, []);
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
      <div className={styles.tabList}>
        
      </div>
      <div className={styles.content}>
        <Table
          data={activeTab === "P"? pacientes:[]}
          headers={headers}
          keys={keys}
          pathLink="/perfil"
        />
      </div>
    </>
  );
};

export default Users;
