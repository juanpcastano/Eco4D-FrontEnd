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
    { month: "Enero", desktop: 1, mobile: 3 },
    { month: "Febrero", desktop: 2, mobile: 6 },
    { month: "Marzo", desktop: 3, mobile: 20 },
    { month: "Abril", desktop: 5, mobile: 30 },
    { month: "Mayo", desktop: 2, mobile: 50 },
    { month: "Junio", desktop: 1, mobile: 6 },
    { month: "Julio", desktop: 5, mobile: 5 },
    { month: "Agosto", desktop: 1, mobile: 30 },
    { month: "Octubre", desktop: 20, mobile: 30 },
    { month: "Noviembre", desktop: 40, mobile: 20 },
    { month: "Diciembre", desktop: 20, mobile: 10 },
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
