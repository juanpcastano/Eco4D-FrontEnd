import { useSelector } from "react-redux";
import { AppStore } from "../../Redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../models/routes";
import styles from "./History.module.css";
import Table from "../../Components/Table/Table";
import { ApiCallObtenerDiagnosticos } from "../../services/apiDataService";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

const History = () => {
  const userState = useSelector((store: AppStore) => store.user);
  const navigate = useNavigate();
  // Añadimos un estado para almacenar los diagnósticos
  const [diagnosticos, setDiagnosticos] = useState<any[]>([]); // Puedes reemplazar 'any[]' con el tipo específico de tus diagnósticos
  let response: any[] = [];
  useEffect(() => {
    const cargarDiagnosticos = async () => {
      try {
        const data = await ApiCallObtenerDiagnosticos();
        response = data;
        let diagnosticosParseados = response.map((diagnostico) => {
          const fechaCompleta = new Date(diagnostico.fecha);
          diagnostico.fecha = fechaCompleta.toISOString().split("T")[0];
          diagnostico.hora = fechaCompleta.toTimeString().split(' ')[0].slice(0, 5); 
          diagnostico.doctorEncargado = diagnostico.medico.nombre_completo;
          return diagnostico;
        });

        setDiagnosticos(diagnosticosParseados);
      } catch (error) {
        let AxiosErr = error as AxiosError;
        console.log((AxiosErr.response?.data as { message: string }).message);
        if (
          (AxiosErr.response?.data as { message: string }).message ==
          "Token inválido o expirado"
        ) {
          navigate("/login");
        }
        console.error("Error al cargar diagnósticos:", error);
        setDiagnosticos([]);
      }
    };

    cargarDiagnosticos();

  }, []);

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
            onClick={() => {
              navigate(PrivateRoutes.M.CREATE_ECOGRAPHY.route);
            }}
          >
            Realizar Ecografía
          </button>
        )}
      </div>
      {diagnosticos.length > 0 ?<Table
        headers={[
          "Fecha",
          "Hora",
          "ID",
          "Doctor Encargado",
          "Edad-Gestacional",
          "",
        ]}
        keys={["fecha", "hora", "id", "doctorEncargado", "edadGestacional"]}
        data={diagnosticos}
        pathLink={PrivateRoutes.ECOGRAPHY.route}
      />:<div className={styles.errorMessage}><span>Aún no tienes ecografías registradas</span></div>}
      
    </>
  );
};

export default History;
