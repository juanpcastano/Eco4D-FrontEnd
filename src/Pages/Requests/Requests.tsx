import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ApiCallObtenerSolicitudesAbiertas,
  ApiCallObtenerSolicitudesCerradas,
} from "../../services/apiDataService";
import Table from "../../Components/Table/Table";
import styles from "./Requests.module.css";
import { AxiosError } from "axios";

const Requests = () => {
  const navigate = useNavigate();
  const [openRequests, setOpenRequests] = useState<any[]>([]);
  const [closedRequests, setClosedRequests] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Open");
  useEffect(() => {
    const cargarSolicitudes = async () => {
      setIsLoading(true);
      try {
        const [abiertas, cerradas] = await Promise.all([
          ApiCallObtenerSolicitudesAbiertas(),
          ApiCallObtenerSolicitudesCerradas(),
        ]);
        setOpenRequests(abiertas);
        setClosedRequests(cerradas);
        setIsLoading(false);
      } catch (error) {
        const AxiosErr = error as AxiosError;
        setError(
          (AxiosErr.response?.data as { message: string })?.message || "Error"
        );
        if (
          (AxiosErr.response?.data as { message: string })?.message ===
          "Token inválido o expirado"
        ) {
          navigate("/login");
        }
        console.error("Error al cargar solicitudes:", error);
        setIsLoading(false);
      }
    };

    cargarSolicitudes();
  }, []);

  useEffect(() => {
    
    if (activeTab === "Open") {
      const parsedOpenRequests = openRequests.map((solicitud: any) => {
        const fechaCompleta = new Date(solicitud.fechaReporte);
        return {
          ...solicitud,
          fecha: fechaCompleta.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          hora: fechaCompleta.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          solicitante: solicitud.solicitante?.nombre_completo || "N/A",
        };
      });
      setData(parsedOpenRequests);
    } else if (activeTab === "Solved") {
      const parsedClosedRequests = closedRequests.map((solicitud: any) => {
        const fechaCompleta = new Date(solicitud.fechaReporte);
        return {
          ...solicitud,
          fecha: fechaCompleta.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          hora: fechaCompleta.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          solicitante: solicitud.solicitante?.nombre_completo || "N/A",
        };
      });
      setData(parsedClosedRequests);
    }
    
    
  }, [activeTab, openRequests, closedRequests]);


  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loadingText}>Cargando solicitudes...</p>
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

  const headers = ["Fecha", "Hora","ID solicitud", "Solicitante", "Título", ""];
  const keys = ["fecha", "hora","id", "solicitante","titulo"];
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.tabList}>
            <div
              className={`${styles.tab} ${
                activeTab === "Open" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("Open")}
            >
              <span className={styles.span}>Abiertas</span>
              <div
                className={`${styles.decorator} ${
                  activeTab === "Open" ? styles.decoratorActive : ""
                }`}
              ></div>
            </div>
            <div
              className={`${styles.tab} ${
                activeTab === "Solved" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("Solved")}
            >
              <span className={styles.span}>Cerradas</span>
              <div
                className={`${styles.decorator} ${
                  activeTab === "Solved" ? styles.decoratorActive : ""
                }`}
              ></div>
            </div>
          </div>
          <div className={styles.content}>
            {data.length > 0 ? (
              <Table
                data={data}
                headers={headers}
                keys={keys}
                pathLink="/request"
              />
            ) : (
              <div className={styles.emptyContainer}>
                <span>No hay solicitudes registradas</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Requests;
