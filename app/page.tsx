import { Card, CardContent } from "@/components/ui/card";

import { FormCaloriesAdd } from "@/components/Form-calories-add";
import ListItem from "@/components/List-item";
import { NavDate } from "@/components/Nav-date";
import { createClient } from "@/utils/supabase/server";
import { readTodaysData } from "@/data/actions";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = await readTodaysData();

  function getTotalCalories(data: any) {
    let totalCalories = 0;
    for (let i = 0; i < data.length; i++) {
      totalCalories += data[i].calories;
    }
    return totalCalories;
  }

  if (!data || data.length === 0) {
    return (
      <main className="flex flex-col items-center p-4 space-y-4 max-w-lg w-full mx-auto">
        <Card className="w-full text-center">
          <CardContent>
            <div className="text-2xl">No records</div>
          </CardContent>
        </Card>
        {user && <FormCaloriesAdd />}
        <NavDate selectedDate={new Date().toISOString()} />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center p-4 space-y-4 max-w-lg w-full mx-auto">
      <Card className="w-full text-center bg-gradient-to-r from-red-500 to-orange-400 p-0.5">
        <CardContent className="bg-background rounded-sm p-4">
          <div className="text-2xl font-semibold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
            {getTotalCalories(data)} kcal
          </div>
        </CardContent>
      </Card>
      {user && <FormCaloriesAdd />}
      <Card className="w-full">
        <CardContent>
          <div>
            {data.map((item, index) => {
              return <ListItem key={index} item={item} />;
            })}
          </div>
        </CardContent>
      </Card>
      <NavDate selectedDate={new Date().toISOString()} />
    </main>
  );
}
