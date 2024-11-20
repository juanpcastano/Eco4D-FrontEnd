import { useState } from "react";
import { DatePickerWithRange } from "@/Components/ui/daterangepicker";
import { BarChartSolicitudes } from "@/Pages/Analytics/Graphics/BarChart";
import { AreaChartt } from "@/Pages/Analytics/Graphics/areachart";
import { Linearchart } from "./Graphics/linearchart";
import { TotalSolicitudes } from "./Graphics/TotalSolicitudes";
const Analytics = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  // Datos de ejemplo
  const allData = [
    { date: "2024-01-01", solicitudes: 120, type: "desktop" },
    { date: "2024-02-01", solicitudes: 150, type: "mobile" },
    { date: "2024-03-01", solicitudes: 180, type: "desktop" },
    { date: "2024-04-01", solicitudes: 130, type: "mobile" },
    { date: "2024-05-01", solicitudes: 200, type: "desktop" },
    { date: "2024-06-01", solicitudes: 250, type: "mobile" },
  ];

  // Filtrar datos según el rango de fechas
  const filteredData = allData.filter((data) => {
    if (dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0];
      const endDate = dateRange[1];
      const currentDate = new Date(data.date);
      return currentDate >= startDate && currentDate <= endDate;
    }
    return true;
  });

  return (
    
    <div className="p-4 space-y-6 ">
      {/* Gráfico: Total de solicitudes */}
      <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-xl font-medium">Total de solicitudes</p>
          <TotalSolicitudes />
      </div>
      
      {/* Gráfico de barras */}
      <div className="bg-white p-4 rounded-lg shadow-md  max-w-[800px]">
        <div className="text-xl font-medium mb-2">Solicitudes por tipo</div>
        <BarChartSolicitudes  />
      </div>
       

      {/* Selector de rango de fechas */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold mb-2">Elige un rango de fecha</p>
        <DatePickerWithRange
          className="text-center"
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </div>

      {/* Sección de gráficos adicionales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Gráfico de área */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-xl font-medium">Uso de la app</div>
          <AreaChartt />
        </div>

        {/* Gráfico: Tiempo de respuesta promedio */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-xl font-medium">Tiempo de respuesta promedio</p>
          <Linearchart />
        </div>

        {/* Gráfico: Calificación promedio del servicio */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-xl font-medium">Calificación promedio del servicio</p>
          <Linearchart />
        </div>

       
      </div>
    </div>
  );
};

export default Analytics;
