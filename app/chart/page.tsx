import { Button } from "@/components/ui/button";
import { Chart } from "@/components/Chart";
import Link from "next/link";
import { readChartData } from "@/data/actions";

export default async function ChartPage() {

  const data = await readChartData();

  return (
    <main className="flex flex-col items-center p-4 space-y-4 max-w-lg w-full mx-auto">
      <div>
        <Chart data={data} />
      </div>

      <div className="flex gap-4">
        <Button variant="outline" asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>

    </main>
  )
}