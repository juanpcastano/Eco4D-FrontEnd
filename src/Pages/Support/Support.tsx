import { useState, useEffect } from "react";
import styles from "./Support.module.css";
import {
  ApiCallCrearSolicitudSoporte,
  ApiCallObtenerMisSolicitudesSoporte,
} from "../../services/apiDataService";
import Table from "../../Components/Table/Table";

// Definir tipos

interface SolicitudFormData {
  titulo: string;
  tipo: string;
  descripcion: string;
}

interface Solicitud {
  id: number;
  titulo: string;
  fecha: string;
  tipo: string;
  estado: string;
  descripcion: string;
}

interface SubmitStatus {
  loading: boolean;
  error: string;
  success: boolean;
}

const INITIAL_FORM_DATA: SolicitudFormData = {
  titulo: "",
  tipo: "fallas tecnicas", 
  descripcion: "",
};

const INITIAL_SUBMIT_STATUS: SubmitStatus = {
  loading: false,
  error: "",
  success: false,
};

export default function Support() {
  const [activeTab, setActiveTab] = useState("enviar");
  const [formData, setFormData] =
    useState<SolicitudFormData>(INITIAL_FORM_DATA);
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(
    INITIAL_SUBMIT_STATUS
  );

  const faqs = [
    "¿Por qué no puedo reproducir el video de mi ecografía?",
    "¿Por qué la ecografía que me tomé hoy no ha llegado?",
    "¿Como descargo mi diagnóstico?",
    "¿El diagnóstico que compartí será visible para siempre?",
  ];

  useEffect(() => {
    if (activeTab === "mis") {
      cargarSolicitudes();
    }
  }, [activeTab]);

  const cargarSolicitudes = async () => {
    setLoading(true);
    try {
      const data = await ApiCallObtenerMisSolicitudesSoporte();
      const parsedRequests = data.map((solicitud: any) => {
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
          estado: solicitud.estado == "A"? "Abierta": "Cerrada",
        };
      });
      setSolicitudes(parsedRequests);
      setError("");
    } catch (err) {
      setError("Error al cargar las solicitudes");
      console.error("Error cargando solicitudes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{console.log(solicitudes)},[solicitudes])

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): string => {
    if (!formData.titulo.trim()) return "El título es requerido";
    if (!formData.descripcion.trim()) return "La descripción es requerida";
    if (!formData.tipo) return "El tipo de solicitud es requerido";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus({
        loading: false,
        error: validationError,
        success: false,
      });
      return;
    }

    setSubmitStatus({
      loading: true,
      error: "",
      success: false,
    });

    try {
      const solicitudData = {
        titulo: formData.titulo.trim(),
        tipo: formData.tipo,
        descripcion: formData.descripcion.trim(),
      };

      await ApiCallCrearSolicitudSoporte(solicitudData);

      setSubmitStatus({
        loading: false,
        error: "",
        success: true,
      });

      setFormData(INITIAL_FORM_DATA);

      if (activeTab === "mis") {
        await cargarSolicitudes();
      }

      setTimeout(() => {
        setSubmitStatus((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al enviar la solicitud";
      setSubmitStatus({
        loading: false,
        error: errorMessage,
        success: false,
      });
    }
  };

  const headers = ["Fecha","Hora", "ID", "Título", "Estado",""];
  const keys = ["fecha", "hora", "id", "titulo", "estado"];

  return (
    <>
      <h2>¿En Qué Podemos Ayudarte?</h2>
      <div className={styles.mainContainer}>
        <div className={styles.tabList}>
          <div
            className={`${styles.tab} ${
              activeTab === "enviar" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("enviar")}
          >
            <span className={styles.span}>Enviar Solicitud</span>
            <div
              className={`${styles.decorator} ${
                activeTab === "enviar" ? styles.decoratorActive : ""
              }`}
            ></div>
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "mis" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("mis")}
          >
            <span className={styles.span}>Mis Solicitudes</span>
            <div
              className={`${styles.decorator} ${
                activeTab === "mis" ? styles.decoratorActive : ""
              }`}
            ></div>
          </div>
        </div>

        {activeTab === "enviar" ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.faqTitle}>Preguntas Frecuentes</h2>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <span className={styles.faqIcon}>▶</span>
                {faq}
              </div>
            ))}
            <hr />
            <h2 className={styles.formTitle}>Envíanos Una Solicitud</h2>

            {submitStatus.success && (
              <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
                Solicitud enviada exitosamente
              </div>
            )}

            {submitStatus.error && (
              <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                {submitStatus.error}
              </div>
            )}

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Título de la solicitud</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Tipo de situación</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  className={styles.select}
                  required
                >
                  <option value="fallas tecnicas">Fallas técnicas</option>
                  <option value="consulta general">Consulta general</option>
                  <option value="consulta general">
                    Inconsistencia de datos
                  </option>
                  <option value="consulta general">Configuraciones</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder="Describe brevemente tu situación y como podemos ayudarte"
                required
              />
            </div>
            <div className={styles.buttonContainer}>
              <button
                type="submit"
                className={`${styles.btnSubmit} dark-gradient-green`}
                disabled={submitStatus.loading}
              >
                {submitStatus.loading ? "Enviando..." : "Enviar Solicitud"}
              </button>
            </div>
          </form>
        ) : (
          <section className={styles.form}>
            {loading ? (
              <p>Cargando solicitudes...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : solicitudes.length === 0 ? (
              <p>No tienes solicitudes registradas.</p>
            ) : (
              <Table
                data={solicitudes}
                headers={headers}
                keys={keys}
                pathLink="/request"
              ></Table>
            )}
          </section>
        )}
      </div>
    </>
  );
}
