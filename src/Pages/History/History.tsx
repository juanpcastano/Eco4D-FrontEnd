import { useSelector } from "react-redux";
import { AppStore } from "../../Redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";
import styles from "./History.module.css";
import Table from "../../Components/Table/Table";
import { ApiCallObtenerDiagnosticos } from "../../services/apiDataService";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

interface Diagnostico {
  id: number;
  fecha: string;
  hora: string;
  edadGestacional: number;
  doctorEncargado: string;
  paciente: {
    nombre_completo: string;
  };
  medico: {
    nombre_completo: string;
  };
}

const History = () => {
  const userState = useSelector((store: AppStore) => store.user);
  const navigate = useNavigate();
  const [diagnosticos, setDiagnosticos] = useState<Diagnostico[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDiagnosticos = async () => {
      try {
        setIsLoading(true);
        const data = await ApiCallObtenerDiagnosticos();

        if (!Array.isArray(data)) {
          throw new Error("Respuesta inválida del servidor");
        }

        const diagnosticosParseados = data.map((diagnostico: any) => {
          const fechaCompleta = new Date(diagnostico.fecha);
          return {
            ...diagnostico,
            fecha: fechaCompleta.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            hora: fechaCompleta.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            }), 
            doctorEncargado: diagnostico.medico?.nombre_completo || "N/A",
            paciente: diagnostico.paciente?.nombre_completo || "N/A",
          };
        });

        setDiagnosticos(diagnosticosParseados);
        setError(null);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error al cargar diagnósticos:", error);

        if (axiosError.response?.status === 401) {
          navigate("/login");
        } else {
          setError(
            "No se pudieron cargar los diagnósticos. Intente nuevamente."
          );
        }

        setDiagnosticos([]);
      } finally {
        setIsLoading(false);
      }
    };

    cargarDiagnosticos();
  }, [navigate]);

  if (userState.rol === "A") {
    return <Navigate to={PrivateRoutes.HOME.A.route} />;
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Cargando diagnósticos...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.errorMessage}>
          <span>{error}</span>
        </div>
      );
    }

    if (diagnosticos.length === 0) {
      return (
        <div className={styles.errorMessage}>
          <span>Aún no tienes ecografías registradas</span>
        </div>
      );
    }

    // Ajustar headers y keys según el rol del usuario
    const headers =
      userState.rol === "P"
        ? [
            "Fecha",
            "Hora",
            "ID",
            "Doctor Encargado",
            "Semanas de Gestación",
            "",
          ]
        : ["Fecha", "Hora", "ID", "Paciente", "Semanas de Gestación", ""];

    const keys =
      userState.rol === "P"
        ? ["fecha", "hora", "id", "doctorEncargado", "edadGestacional"]
        : ["fecha", "hora", "id", "paciente", "edadGestacional"];

    return (
      <div className={styles.mainContainer}>
        <Table
          headers={headers}
          keys={keys}
          data={diagnosticos}
          pathLink={PrivateRoutes.ECOGRAPHY.route}
        />
      </div>
    );
  };

  return (
    <>
      <div className={styles.titleAndButton}>
        <h2 className={styles.title}>Mis Ecografías</h2>
        {userState.rol === "M" && (
          <button
            className={`dark-gradient-green ${styles.btnCrearDiagnostico}`}
            onClick={() => {
              navigate(PrivateRoutes.M.CREATE_ECOGRAPHY.route);
            }}
          >
            Realizar Ecografía
          </button>
        )}
      </div>
      {renderContent()}
    </>
  );
};

export default History;
