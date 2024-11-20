"use client"
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis, Tooltip } from "recharts";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/Components/ui/card";

import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltipContent 
} from "@/Components/ui/chart";

import { ApiCallObtenerSolicitudesAbiertas } from "@/services/apiDataService";

  // Chart configuration
  const chartConfig = {
    cantidad: {
      label: "Número de Solicitudes",
    },
    'Falla Técnica': {
      label: "Fallas Técnicas",
      color: "hsl(var(--chart-2))",
    },
    'Incidencia de Datos': {
      label: "Incidencia Datos",
      color: "hsl(var(--chart-2))",
    },
    'Configuración': {
      label: "Configuraciones",
      color: "hsl(var(--chart-3))",
    },
    'Otros': {
      label: "Otros",
      color: "hsl(var(--chart-4))",
    }
  } satisfies ChartConfig;
// Interface matching your specification
interface Solicitudes {
  id: string;
  titulo: string;
  fechaReporte: string;
  fechaSolucion: string | null;
  tipo: string;
  descripcion: string;
  estado: string;
  solicitanteId: number;
  solicitante: {
    nombre_completo: string;
  };
}

export function BarChartSolicitudes() {
  const [dataSolicitudes, setDataSolicitudes] = useState<Solicitudes[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorSolicitudes, setErrorSolicitudes] = useState<string | null>(null);

  // Process support ticket types
  const processTicketTypes = (solicitudes: Solicitudes[]) => {
    const typeCounts = {
      'falla Técnica': 0,
      'incidencia de Datos': 0,
      'configuración': 0,
      'otros': 0
    };

    solicitudes.forEach(solicitud => {
      const tipoNormalizado = solicitud.tipo.trim().toLowerCase();
      
      if (tipoNormalizado.includes('falla') || tipoNormalizado.includes('tecnica')) {
        typeCounts['falla Técnica']++;
      } else if (tipoNormalizado.includes('datos') || tipoNormalizado.includes('inconsistencia')) {
        typeCounts['incidencia de Datos']++;
      } else if (tipoNormalizado.includes('config')) {
        typeCounts['configuración']++;
      } else {
        typeCounts['otros']++;
      }
    });

    return Object.entries(typeCounts)
      .filter(([_, count]) => count > 0)
      .map(([type, count]) => ({
        tipo: type,
        cantidad: count,
        fill: `var(--color-${type.toLowerCase().replace(/\s+/g, '-')})`
      }));
  };


  // Fetch support tickets
  useEffect(() => {
    const cargarSolicitudes = async () => {
      try {
        setLoading(true);
        const data: Solicitudes[] = await ApiCallObtenerSolicitudesAbiertas();
        setDataSolicitudes(data);
      } catch (err: any) {
        setErrorSolicitudes(
          err.response?.data?.message || "Error al cargar solicitudes"
        );
      } finally {
        setLoading(false);
      }
    };

    cargarSolicitudes();
  }, []);

  // Prepare chart data
  const chartData = processTicketTypes(dataSolicitudes);

  if (loading) return <div>Cargando solicitudes...</div>;
  if (errorSolicitudes) return <div>Error: {errorSolicitudes}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solicitudes en el Último Mes</CardTitle>
        <CardDescription>Distribución de tipos de solicitudes de soporte</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart 
            width={400} 
            height={300} 
            data={chartData}
            layout="vertical"
          >
            <CartesianGrid horizontal={false} />
            <XAxis 
              type="number" 
              axisLine={false}
            />
            <YAxis 
              dataKey="tipo" 
              type="category" 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              content={<ChartTooltipContent />} 
              cursor={false} 
            />
            <Bar
              dataKey="cantidad"
              strokeWidth={2}
              radius={[0, 8, 8, 0]}
              activeBar={({ ...props }) => (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              )}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" />
          <span>Total Solicitudes: {dataSolicitudes.length}</span>
        </div>
      </CardFooter>
    </Card>
  );
}