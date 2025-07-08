"use client";

import { Bar, BarChart, CartesianGrid, ReferenceLine } from "recharts";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Database } from "@/utils/supabase/database.types";

const chartConfig = {
  calories: {
    label: "Calories",
    color: "#ff450a",
  },
   max: {
    label: "Goal",
    color: "#ff330a",
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
        <ChartTooltip content={
        // @ts-ignore
          <ChartTooltipContent label={"date"} active={false} payload={[]} accessibilityLayer={false} />
        } />
        
        <Bar dataKey="calories" fill="var(--color-calories)" radius={4} />
        <ReferenceLine y={1500} stroke="var(--color-max)" strokeWidth={1.25} strokeDasharray="4 3" />
      </BarChart>
    </ChartContainer>
  );
}
