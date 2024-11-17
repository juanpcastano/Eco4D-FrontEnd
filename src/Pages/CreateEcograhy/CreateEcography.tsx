import { useState, FormEvent, useEffect } from "react";
import styles from "./CreateEcography.module.css";
import { useSelector } from "react-redux";
import { AppStore } from "../../Redux/store";
import {
  ApiCallObtenerPacientes,
  ApiCallSubirDiagnostico,
} from "../../services/apiDataService";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const CreateEcography = () => {
  const [diagnosisDetails, setDiagnosisDetails] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [gestationalAge, setGestationalAge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pacientes, setPacientes] = useState<any[]>([]);
  const navigate = useNavigate();

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files &&
      event.target.files[0] &&
      event.target.files[0].type === "video/*"
    ) {
      setVideo(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPatient || !gestationalAge || !diagnosisDetails) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }

    try {
      setIsSubmitting(true);

      // Aquí irá la lógica para enviar los datos al backend
      const formData = new FormData();
      formData.append("paciente", selectedPatient);
      formData.append("edad_gestacional", gestationalAge);
      formData.append("diagnostico", diagnosisDetails);
      if (photo) formData.append("foto", photo);
      if (video) formData.append("video", video);

      // Ejemplo de envío (ajusta según tu API):
      let res = ApiCallSubirDiagnostico(formData);
      console.log(res);

      // if (!response.ok) throw new Error('Error al guardar la ecografía');

      alert("Ecografía guardada exitosamente");
      // Limpiar el formulario
      setSelectedPatient("");
      setGestationalAge("");
      setDiagnosisDetails("");
      setPhoto(null);
      setVideo(null);
    } catch (error) {
      alert("Error al guardar la ecografía: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const userState = useSelector((store: AppStore) => store.user);

  useEffect(() => {
    const cargarPacientes = async () => {
      try {
        const data = await ApiCallObtenerPacientes();
        console.log(data);

        setPacientes(data);
      } catch (error) {
        let AxiosErr = error as AxiosError;
        console.log((AxiosErr.response?.data as { message: string }).message);
        if (
          (AxiosErr.response?.data as { message: string }).message ==
          "Token inválido o expirado"
        ) {
          navigate("/login");
        }
        console.error("Error al cargar pacieentes:", error);
        setPacientes([]);
      }
    };

    cargarPacientes();
  }, []);

  return (
    <>
      <h2 className={styles.titulo}>Nueva Ecografía</h2>
      <form onSubmit={handleSubmit} className={styles.mainContainer}>
        <div className={styles.uploadContainer}>
          <div className={styles.uploadBox}>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              id="photo-upload"
            />
            {photo ? <p>{photo.name}</p> : <p>Sube una foto</p>}
          </div>
          <div className={styles.uploadBox}>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              id="video-upload"
            />
            {video ? <p>{video.name}</p> : <p>Sube un video</p>}
          </div>
        </div>
        <hr />
        <h3 className={styles.nonMarginTitle}>
          Diagnóstico del doctor {userState.nombre_completo}
        </h3>
        <div className={styles.optionsContainer}>
          <label htmlFor="nombre_paciente">Paciente</label>
          <label htmlFor="edad_gestacional">Edad Gestacional</label>
          <select
            name="nombre_paciente"
            id="nombre_paciente"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            required
          >
            <option value="">Seleccione...</option>
            {pacientes.length>0 && pacientes.map((paciente) => {
              return (
                <option value={paciente.identificacion}>
                  {paciente.nombre_completo + " - " + paciente.identificacion}
                </option>
              );
            })}
          </select>
          <div className={styles.weeks}>
            <input
              type="number"
              id="edad_gestacional"
              max="36"
              min="0"
              step="1"
              value={gestationalAge}
              onChange={(e) => setGestationalAge(e.target.value)}
              className={styles.noarrows}
              required
              onKeyDown={(e) => {
                if (
                  e.key === "e" ||
                  e.key === "E" ||
                  e.key === "." ||
                  e.key === "-"
                ) {
                  e.preventDefault();
                }
              }}
              onPaste={(e) => {
                const text = e.clipboardData.getData("text");
                if (
                  text.includes("e") ||
                  text.includes("E") ||
                  text.includes(".") ||
                  text.includes("-")
                ) {
                  e.preventDefault();
                }
              }}
            />
            <p>Semanas</p>
          </div>
        </div>
        <hr />
        <textarea
          className={styles.textarea}
          placeholder="Escribe los detalles del diagnóstico"
          value={diagnosisDetails}
          onChange={(e) => setDiagnosisDetails(e.target.value)}
          required
        />
        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={`dark-gradient-green ${styles.btnSubmit}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar Ecografía"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateEcography;
