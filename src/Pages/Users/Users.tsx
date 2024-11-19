import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ApiCallObtenerPacientes } from "../../services/apiDataService";
import Table from "../../Components/Table/Table";
import styles from './Users.module.css';

const Users = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarPacientes = async () => {
      try {
        setIsLoading(true);
        const data = await ApiCallObtenerPacientes();

        if (!Array.isArray(data)) {
          throw new Error("Respuesta inválida del servidor");
        }

        const pacientesFiltrados = data.filter(usuario => usuario.rol === 'P');
        setPacientes(pacientesFiltrados);
        setError(null);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
        
        if (error.response?.status === 401) {
          navigate("/paciente-error");
        } else {
          setError("No se pudieron cargar los pacientes. Por favor, intente nuevamente.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    cargarPacientes();
  }, [navigate]);

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

  // Define los encabezados y las claves que usará la tabla
  const headers = ["Id","Nombre", "Correo", "Edad", "Perfiles"];
  const keys = ["Id","nombre_completo", "correo_electronico", "edad", "Perfil"]; // 'id' es necesario para el botón 

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Lista de Pacientes</h2>
        
      </div>
      
      {/* Renderiza el componente Table */}
      <Table
        data={pacientes}
        headers={headers}
        keys={keys}
        pathLink="/perfil" // Define la ruta base para el botón "Ver Detalles"
      />
    </div>
  );
};

export default Users;
