import { Button } from "@/components/ui/button";
import { Chart } from "@/components/Chart";
import Link from "next/link";
import { readChartData } from "@/data/actions";

export default async function ChartPage() {

  const data = await readChartData();

  function allAvg() {
    if (!Array.isArray(data) || data.length === 0) {
      return null; // Handle empty or invalid input
    }
  
    // Calculate the sum of all calories
    const totalCalories = data.reduce(
      (sum, entry) => sum + entry.calories,
      0,
    );
  
    // Calculate the average
    return Math.round(totalCalories / data.length);

  }

  function lastWeekAvg() {
    const n = 7

    if (!Array.isArray(data) || data.length === 0 || n <= 0) {
      return null; // Handle invalid input
    }
  
    // Get the last N entries
    const lastNEntries = data.slice(Math.max(data.length - n, 0));
  
    if (lastNEntries.length === 0) {
      return null; // No entries to average
    }
  
    // Calculate the sum of calories for these entries
    const totalCalories = lastNEntries.reduce(
      (sum, entry) => sum + entry.calories,
      0,
    );
  
    // Calculate the average
    return Math.round(totalCalories / lastNEntries.length);
  }

  return (
    <main className="space-y-2">
      <div className="w-full max-w-2xl mx-auto">
        <Chart data={data} />
      </div>
    
      <div className="flex flex-col items-center p-4 space-y-4 max-w-lg w-full mx-auto">

        <div className="flex gap-4 w-full">
          <Card className="w-full text-center bg-gradient-to-r from-red-600 to-orange-600 p-0.5">
            <CardContent className="bg-background rounded-sm p-4">
              <div>
                avarage
              </div>
              <div className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                {allAvg()} kcal
              </div>
            </CardContent>
          </Card>

          <Card className="w-full text-center bg-gradient-to-r from-orange-600 to-orange-500 p-0.5">
            <CardContent className="bg-background rounded-sm p-4">
              <div>
                last week
              </div>
              <div className="text-2xl font-semibold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                {lastWeekAvg()} kcal
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}