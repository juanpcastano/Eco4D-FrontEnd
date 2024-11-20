"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
const chartData = [
    { month: "Enero", desktop: 186, mobile: 80 },
    { month: "Febrero", desktop: 305, mobile: 200 },
    { month: "Marzo", desktop: 237, mobile: 120 },
    { month: "Abril", desktop: 73, mobile: 190 },
    { month: "Mayo", desktop: 209, mobile: 130 },
    { month: "Junio", desktop: 214, mobile: 140 },
    { month: "Julio", desktop: 214, mobile: 140 },
    { month: "Agosto", desktop: 214, mobile: 140 },
    { month: "Octubre", desktop: 214, mobile: 140 },
    { month: "Noviembre", desktop: 214, mobile: 140 },
    { month: "Diciembre", desktop: 214, mobile: 140 },
  ]

const chartConfig = {
  desktop: {
    label: "Pacientes",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Medicos",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AreaChartt() {
  return (
    <Card>
      <CardHeader>
        <CardTitle> Usos de la app en el ultimo año  </CardTitle>
        <CardDescription>
          
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Decremento de uso en los ultimos meses <TrendingDown className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Enero - Diciembre 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
