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
      const file = event.target.files[0];
      // Validar tamaño y tipo de imagen
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (file.size > maxSize) {
        alert("El archivo de imagen no debe superar 5MB");
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        alert("Solo se permiten archivos de imagen JPG, PNG o GIF");
        return;
      }

      setPhoto(file);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Validar tamaño y tipo de video
      const maxSize = 50 * 1024 * 1024; // 50MB
      const allowedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/avi'];

      if (file.size > maxSize) {
        alert("El archivo de video no debe superar 50MB");
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        alert("Solo se permiten archivos de video MP4, MPEG, QuickTime o AVI");
        return;
      }

      setVideo(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validaciones
    if (!selectedPatient) {
      alert("Por favor, seleccione un paciente");
      return;
    }

    if (!gestationalAge || parseInt(gestationalAge) < 0 || parseInt(gestationalAge) > 36) {
      alert("Por favor, ingrese una edad gestacional válida (0-36 semanas)");
      return;
    }

    if (!diagnosisDetails || diagnosisDetails.length < 10) {
      alert("La descripción del diagnóstico debe tener al menos 10 caracteres");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("pacienteId", selectedPatient);
      formData.append("descripcion", diagnosisDetails);
      formData.append("edadGestacional", gestationalAge);
      
      if (photo) formData.append("imagen", photo);
      if (video) formData.append("video", video);

      const response = await ApiCallSubirDiagnostico(formData);

      if (response) {
        alert("Ecografía guardada exitosamente");
        // Limpiar el formulario
        setSelectedPatient("");
        setGestationalAge("");
        setDiagnosisDetails("");
        setPhoto(null);
        setVideo(null);
      }
    } catch (error: any) {
      console.error("Error al guardar la ecografía:", error);
      alert(`Error al guardar la ecografía: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const userState = useSelector((store: AppStore) => store.user);

  useEffect(() => {
    const cargarPacientes = async () => {
      try {
        const data = await ApiCallObtenerPacientes();
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
        console.error("Error al cargar pacientes:", error);
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
            {pacientes.length > 0 && pacientes.map((paciente, index) => (
              <option 
                key={index} 
                value={paciente.identificacion}
              >
                {paciente.nombre_completo + " - " + paciente.identificacion}
              </option>
            ))}
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
          placeholder="Escribe los detalles del diagnóstico (mínimo 10 caracteres)"
          value={diagnosisDetails}
          onChange={(e) => setDiagnosisDetails(e.target.value)}
          required
          minLength={10}
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