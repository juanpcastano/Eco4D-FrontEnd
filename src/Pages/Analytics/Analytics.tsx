import { DatePickerWithRange } from '@/Components/ui/daterangepicker';
import { BarChartSolicitudes } from '@/Pages/Analytics/barchart';
import { AreaChartt } from '@/Pages/Analytics/areachart';

import { Linearchart } from './linearchart';
const Analytics = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Sección del selector de fecha */}
      <div >
        <p className="text-lg font-semibold">Elige un rango de fecha
        <DatePickerWithRange className='text-center'/>
        </p>
       
      </div>


      {/* Sección de gráficos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Gráfico de barras */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-xl font-medium">Solicitudes por tipo</div>
          <BarChartSolicitudes />
        </div>

        {/* Gráfico de área */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-xl font-medium">Uso de la app</div>
          <AreaChartt />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-xl font-medium">
            Tiempo de respuesta promedio 
          </p>
          <Linearchart />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-xl font-medium">
            Calificación promedio del servicio
          </p>
          <Linearchart />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-xl font-medium">
            Total de solicitudes
          </p>
          <Linearchart />
        </div>
      </div>

      
    </div>
    
  );
};

export default Analytics;
