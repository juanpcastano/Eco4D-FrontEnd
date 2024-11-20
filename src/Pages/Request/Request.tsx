import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiCallObtenerSolicitudSoportePorId, ApiCallCrearMensaje } from '../../services/apiDataService';
import { Solicitud } from '../../models/solicitud.model';

export default function SolicitudRequest() {
  const { id } = useParams<{ id: string }>();
  const [solicitud, setSolicitud] = useState<Solicitud | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [respuesta, setRespuesta] = useState('');
  const [enviandoMensaje, setEnviandoMensaje] = useState(false);

  useEffect(() => {
    if (id) {
      ApiCallObtenerSolicitudSoportePorId(id)
        .then(data => {
          setSolicitud(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleEnviarRespuesta = async () => {
    if (!id || !respuesta.trim()) return;

    try {
      setEnviandoMensaje(true);
      await ApiCallCrearMensaje(id, respuesta);
      setRespuesta('');
      // Podrías querer recargar los mensajes o actualizar la solicitud aquí
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      // Manejar el error (mostrar mensaje al usuario, etc.)
    } finally {
      setEnviandoMensaje(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">Cargando solicitud...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
        <strong className="font-bold">Error de Solicitud</strong>
        <p className="mt-2">{error.message}</p>
      </div>
    );
  }

  if (!solicitud) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            {solicitud.titulo} 
            <span className="text-sm text-gray-500"> // ID: {solicitud.id}</span>
          </h1>
          {solicitud.solicitante && (
            <p className="text-lg text-gray-600 mb-4">
              Solicitante: {solicitud.solicitante.nombre_completo}
            </p>
          )}
          <p className="text-base text-gray-700">{solicitud.descripcion}</p>
        </div>

        <div className="p-6">
          <div className="mb-2 text-sm text-gray-500">Añadir respuesta</div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Escribe tu respuesta aquí..."
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            disabled={solicitud.estado === 'C'}
          />
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {solicitud.estado === 'C'
                ? 'Esta solicitud está cerrada'
                : 'Escribe tu respuesta para la solicitud'}
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              onClick={handleEnviarRespuesta}
              disabled={!respuesta.trim() || enviandoMensaje || solicitud.estado === 'C'}
            >
              {enviandoMensaje ? 'Enviando...' : 'Enviar Respuesta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}