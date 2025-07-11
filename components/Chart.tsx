"use client";

import { Bar, BarChart, CartesianGrid, ReferenceLine } from "recharts";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
} from "@/components/ui/chart";
import { Database } from "@/utils/supabase/database.types";

const chartConfig = {
  calories: {
    label: "Calories",
    color: "#ff450a",
  },
  date: {
    label: "Date",
    color: "#ff450a",
  },
  min: {
    label: "Min",
    color: "#ff220a",
  },
  max: {
    label: "Max",
    color: "#ff220a",
  },
} satisfies ChartConfig;

export function Chart(data: {
  data: Database["public"]["Tables"]["totals"]["Row"][];
}) {
  const chartData = data.data;

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <ChartTooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded border bg-background p-2 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-md text-foreground">
                      {payload[0].payload.date}
                    </span>
                    <span className="text-lg text-foreground leading-tight">
                      {payload[0].value}
                    </span>
                  </div>
                </div>
              );
            }
          }}
        />

        <Bar dataKey="calories" fill="var(--color-calories)" radius={4} />
        <ReferenceLine
          y={1500}
          stroke="var(--color-min)"
          strokeWidth={1.25}
          strokeDasharray="4 3"
        />
        <ReferenceLine
          y={2000}
          stroke="var(--color-max)"
          strokeWidth={1.25}
          strokeDasharray="4 3"
        />
      </BarChart>
    </ChartContainer>
  );
}
