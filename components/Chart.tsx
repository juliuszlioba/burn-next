"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
} satisfies ChartConfig;

export function Chart(data: {
  data: Database["public"]["Tables"]["totals"]["Row"][];
}) {
  const chartData = data.data;

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={true}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(5, 10)}
        />

        <ChartTooltip content={
        // @ts-ignore
          <ChartTooltipContent label={"date"} active={false} payload={[]} accessibilityLayer={false} />
        } />
        <Bar dataKey="calories" fill="var(--color-calories)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
