import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStore } from '../../Redux/store';
import { ApiCallObtenerDiagnosticoPorId } from '../../services/apiDataService';
import styles from './Ecography.module.css';

interface DiagnosticData {
  id: number;
  descripcion: string;
  edadGestacional: number;
  fecha: string;
  calificacion: number | null;
  enlaceFoto: string;
  enlaceVideo: string;
  medico: {
    nombre_completo: string;
    correo_electronico: string;
  };
  paciente: {
    nombre_completo: string;
    correo_electronico: string;
    edad?: number;
  };
}

export default function Ecography() {
  const { id } = useParams<{ id: string }>();
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const userState = useSelector((store: AppStore) => store.user);

  useEffect(() => {
    const fetchDiagnostic = async () => {
      try {
        setLoading(true);
        const data = await ApiCallObtenerDiagnosticoPorId(id!);
        setDiagnosticData(data);
        if (data.calificacion) {
          setRating(data.calificacion);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al cargar el diagnóstico');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDiagnostic();
    }
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Cargando diagnóstico...</div>;
  }

  if (error || !diagnosticData) {
    return <div className={styles.error}>{error || 'No se pudo cargar el diagnóstico'}</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Ecografía #{diagnosticData.id}</h1>

        <div className={styles.mediaContainer}>
          {diagnosticData.enlaceVideo && (
            <video 
              className={styles.video} 
              controls
              src={diagnosticData.enlaceVideo}
            >
              Tu navegador no soporta el elemento de video.
            </video>
          )}
          {diagnosticData.enlaceFoto && (
            <img 
              className={styles.image} 
              src={diagnosticData.enlaceFoto} 
              alt="Ecografía"
            />
          )}
        </div>

        <div className={styles.content}>
          <h2 className={styles.subtitle}>
            Diagnóstico del doctor {diagnosticData.medico.nombre_completo}
          </h2>
          
          <div className={styles.info}>
            <p>Diagnóstico Ecográfico Abdominal 4D</p>
            <p>Paciente: {diagnosticData.paciente.nombre_completo}</p>
            <p>Edad: {diagnosticData.paciente.edad} años</p>
            <p>Fecha del estudio: {formatDate(diagnosticData.fecha)}</p>
            <p>Edad gestacional: {diagnosticData.edadGestacional} semanas</p>
          </div>

          <div className={styles.description}>
            <h3 className={styles.sectionTitle}>Hallazgos Ecográficos:</h3>
            <p>{diagnosticData.descripcion}</p>
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.button}
              onClick={() => window.print()}
            >
              Imprimir Diagnóstico
            </button>
            {userState.rol === 'P' && (
              <button className={`${styles.button} ${styles.outline}`}>
                Compartir Diagnóstico
              </button>
            )}
          </div>

          {userState.rol === 'P' && !diagnosticData.calificacion && (
            <div className={styles.feedback}>
              <h3 className={styles.feedbackTitle}>¿Qué te ha parecido el servicio?</h3>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`${styles.star} ${rating >= star ? styles.filled : ''}`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <div className={styles.feedbackForm}>
                <label htmlFor="feedback" className={styles.feedbackLabel}>
                  Cuéntanos por qué
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className={styles.feedbackTextarea}
                />
              </div>

              <div className={styles.submitFeedback}>
                <button 
                  className={styles.button}
                  onClick={async () => {
                    try {
                      await ApiCallObtenerDiagnosticoPorId(id!);
                      setDiagnosticData({
                        ...diagnosticData,
                        calificacion: rating
                      });
                    } catch (err: any) {
                      setError(err.response?.data?.message || 'Error al enviar la calificación');
                    }
                  }}
                >
                  Enviar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}