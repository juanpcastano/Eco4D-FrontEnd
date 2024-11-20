"use client"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppStore } from "../../Redux/store";
import { ApiCallObtenerMedicos } from "@/services/apiDataService"
import { ApiCallObtenerMisSolicitudesSoporte } from "@/services/apiDataService"
import { ApiCallObtenerPacientes } from "@/services/apiDataService"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { ChartConfig, ChartContainer } from "@/Components/ui/chart"
const chartDataPacientes = [
  { browser: "safari", visitors: 150, fill: "var(--color-safari)" },
]
const chartDataMedicos = [
  { browser: "safari", visitors: 100, fill: "var(--color-safari)" },
]



const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface DataSolicitudes {
  id:number
  FechaReporte:Date,
  FechaSolucion:Date
  Tipo:string
  Estado:string
  Descripcion:string

  pacientes: {
    cedula:number, 
    nombre_completo: string;
    correo_electronico: string;
    edad?: number;
    rol:string
  };
  medicos: {
    cedula:number, 
    nombre_completo: string;
    correo_electronico: string;
    edad?: number;
    rol:string
  };
  
}
export function TotalSolicitudes() {
  
 
  
  const [DataSolicitudes, setDataSolicitudes]=useState<DataSolicitudes|null>(null);

  const [loading, setLoading] = useState(true);
  
  const [errorSolicitudes, setErrorSolicitudes] = useState<string | null>(null);
  
  const [paciente,setcontPac]=useState(0)
  const [medicos,setcontMed]=useState(0)


  useEffect(()=>{
    const fetchSolititud =async ()=>{
      try {
        setLoading(true);
        const data =await ApiCallObtenerMisSolicitudesSoporte();
        setDataSolicitudes(data)
       
        

      } catch(err:any){
        setErrorSolicitudes(
          err.response?.dataMedicos?.message || "Error al cargar medicos"
         
          
        );
        

      } finally {
        setLoading(false)
      }
    };
    
   
    
    
  })

 


  return (

    
    <Card className="flex flex-col">
      {/* Pacientes*/}
      <CardHeader className="items-center pb-0">
        <CardTitle># Solicitudes pacientes</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartDataPacientes}
            endAngle={100}
            innerRadius={80}
            outerRadius={140}
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
                          {chartDataPacientes[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Pacientes
                        </tspan>
                      </text>
                    )
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
        <div className="leading-none text-muted-foreground">
          
        </div>
      </CardFooter>
      
      {/*Medicos*/ }

      <CardHeader className="items-center pb-0">
        <CardTitle># Solicitudes medicos</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartDataMedicos}
            endAngle={50}
            innerRadius={80}
            outerRadius={140}
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
                          {chartDataMedicos[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Medicos
                        </tspan>
                      </text>
                    )
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
        <div className="leading-none text-muted-foreground">
         
        </div>
      </CardFooter>
    </Card>
  )
}