import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../Components/Table/Table";
import styles from "./SpecificUser.module.css";
import { UserInfo } from "../../models/user.model";
import {
  ApiCallObtenerDiagnosticosPorIdUsuario,
  ApiCallObtenerUsuarioPorId,
} from "../../services/apiDataService";

interface Diagnostic {
  id: number;
  fecha: string;
  edadGestacional: number;
  descripcion: string;
  medico: {
    nombre_completo: string;
    correo_electronico: string;
  };
  paciente: {
    nombre_completo: string;
    correo_electronico: string;
  };
}
const SpecificUser = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleEditProfile = () => {
    navigate(`/settings/${id}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const userData = await ApiCallObtenerUsuarioPorId(id || "");
        const diagnosticsData = await ApiCallObtenerDiagnosticosPorIdUsuario(
          id || ""
        );
        setUser(userData);
        setDiagnostics(diagnosticsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  if (!user) {
    return (
      <div className={styles.error}>
        No se pudo cargar la información del usuario
      </div>
    );
  }

  if (user.rol === "A") {
    return (
      <div className={styles.adminMessage}>
        Acceso no permitido para administradores
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-CO");
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const tableData = diagnostics.map((diagnostic) => ({
    id: diagnostic.id,
    fecha: formatDate(diagnostic.fecha),
    hora: formatTime(diagnostic.fecha),
    doctorEncargado:
      user.rol === "M"
        ? diagnostic.paciente.nombre_completo
        : diagnostic.medico.nombre_completo,
  }));

  const headers = [
    "Fecha",
    "Hora",
    "ID De Ecografía",
    user.rol === "M" ? "Paciente" : "Doctor Encargado",
  ];

  const keys = ["fecha", "hora", "id", "doctorEncargado"];

  return (
    <>
      <h2>{user.nombre_completo}</h2>
      <div className={styles.mainContainer}>
        <div className={styles.profileSection}>
          <img
            src={
              user.url_foto_de_perfil ||
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ3ecoYCIXbBsczNsN0icdz3oUUQEivp59Ugghl0AQBSJskziDV"
            }
            alt={user.nombre_completo}
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <span>
              {user.tipoIdentificacion} {user.identificacion}
            </span>
            <span>{user.correo_electronico}</span>
            <span>
              {user.ciudad}, {user.pais}
            </span>
            <span>{formatDate(user.fecha_nacimiento)}</span>
          </div>
        </div>

        <div className={styles.diagnosticsSection}>
          <h2 className={styles.sectionTitle}>Ecografías recientes</h2>
          {tableData.length > 0 ? (
            <Table
              data={tableData}
              headers={headers}
              keys={keys}
              pathLink="/ecography"
            />
          ) : (
            <div className={styles.emptyEcos}>
              Este usuario aún no tiene ecografías
            </div>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button className={`${styles.btnSubmit} dark-gradient-green`} onClick={handleEditProfile}>
            Editar Perfil
          </button>
        </div>
      </div>
    </>
  );
};

export default SpecificUser;
