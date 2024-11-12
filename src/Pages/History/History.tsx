import { useSelector } from "react-redux";
import { AppStore } from "../../Redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";
import styles from "./History.module.css";
import Table from "../../Components/Table/Table";
import { ApiCallObtenerDiagnosticos } from "../../services/apiDataService";
import { useEffect, useState } from "react";

const History = () => {
  const userState = useSelector((store: AppStore) => store.user);
  const navigate = useNavigate();
  // Añadimos un estado para almacenar los diagnósticos
  const [diagnosticos, setDiagnosticos] = useState<any[]>([]); // Puedes reemplazar 'any[]' con el tipo específico de tus diagnósticos

  useEffect(() => {
    // Función para cargar los diagnósticos
    const cargarDiagnosticos = async () => {
      try {
        const data = await ApiCallObtenerDiagnosticos();
        setDiagnosticos(data);
      } catch (error) {
        console.error("Error al cargar diagnósticos:", error);
        setDiagnosticos([]);
      }
    };

    cargarDiagnosticos();
  }, []); // El array vacío significa que solo se ejecutará una vez al montar el componente

  if (userState.rol === "A") {
    return <Navigate to={PrivateRoutes.HOME.A.route} />;
  }

  return (
    <>
      <div className={styles.titleAndButton}>
        <h2 className={styles.titulo}>Mis Ecografías</h2>
        {userState.rol === "M" && (
          <button
            className={`dark-gradient-green ${styles.btnCrearDiagnostico}`}
            onClick={()=>{navigate(PrivateRoutes.M.CREATE_ECOGRAPHY.route)}}
          >
            Realizar Ecografía
          </button>
        )}
      </div>
      <Table
        keys={["Fecha", "Hora", "ID", "DoctorEncargado"]}
        data={diagnosticos}
      />
    </>
  );
};

export default History;
