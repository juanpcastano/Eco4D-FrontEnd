"use client";
import { useEffect, useState } from "react";

import { ApiCallObtenerSolicitudesAbiertas } from "@/services/apiDataService";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { ChartConfig, ChartContainer } from "@/Components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Solicitudes",
  },
  safari: {
    label: "Total",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

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

export function TotalSolicitudes() {
  const [dataSolicitudes, setDataSolicitudes] = useState<Solicitudes[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorSolicitudes, setErrorSolicitudes] = useState<string | null>(null);
  const [totalSolicitudes, setTotalSolicitudes] = useState(0); // Estado para almacenar el total

  useEffect(() => {
    const cargarSolicitudes = async () => {
      try {
        setLoading(true);
        const data: Solicitudes[] = await ApiCallObtenerSolicitudesAbiertas();
        setDataSolicitudes(data); // Almacena los datos en el estado

        // Contamos el número total de solicitudes
        setTotalSolicitudes(data.length); // Aquí se cuenta el número de solicitudes
      } catch (err: any) {
        setErrorSolicitudes(
          err.response?.dataMedicos?.message || "Error al cargar solicitudes"
        );
      } finally {
        setLoading(false);
      }
    };

    cargarSolicitudes();
  }, []);

  return (
    <Card className="flex flex-col">
      {/* Solicitudes */}
      <CardHeader className="items-center pb-0">
        <CardTitle># Solicitudes</CardTitle>
        <CardDescription>{totalSolicitudes} Solicitudes</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={[{ visitors: totalSolicitudes, fill: "var(--color-safari)" }]} // Usamos el total de solicitudes
            endAngle={100}
            innerRadius={100}
            outerRadius={150}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {totalSolicitudes.toLocaleString()} {/* Mostrar totalSolicitudes */}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Solicitudes
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground"></div>
      </CardFooter>
    </Card>
  );
}
