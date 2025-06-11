import { Card, CardContent } from "@/components/ui/card";

import { Calendar } from "lucide-react";
import { FormCaloriesAdd } from "@/components/Form-calories-add";
import ListItem from "@/components/List-item";
import { NavDate } from "@/components/Nav-date";
import { Tables } from "@/utils/supabase/database.types";
import { createClient } from "@/utils/supabase/server";
import { readDateData } from "@/data/actions";

type Record = Tables<"records">;

export default async function PageDate({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { date } = await params;

  const data = await readDateData(date);

  function getTotalCalories(data: Record[]) {
    let totalCalories = 0;
    for (let i = 0; i < data.length; i++) {
      totalCalories += data[i].calories;
    }
    return totalCalories;
  }

  if (!data || data.length === 0) {
    return (
      <main className="flex flex-col items-center p-4 space-y-4 max-w-lg w-full mx-auto">
        <Card className="w-full">
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="bg-background p-2 rounded-full">
                <Calendar strokeWidth={2} />
              </div>
              <h1>{date}</h1>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full text-center">
          <CardContent>
            <div className="text-2xl">No records</div>
          </CardContent>
        </Card>
        {user && <FormCaloriesAdd selectedDate={date} />}
        <NavDate selectedDate={date} />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center p-4 space-y-4 max-w-lg w-full mx-auto">
      <Card className="w-full">
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="bg-background p-2 rounded-full">
              <Calendar strokeWidth={2} />
            </div>
            <h1>{date}</h1>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full text-center bg-gradient-to-r from-red-500 to-orange-400 p-0.5">
        <CardContent className="bg-background rounded-sm p-4">
          <div className="text-2xl font-semibold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
            {getTotalCalories(data)} kcal
          </div>
        </CardContent>
      </Card>
      {user && <FormCaloriesAdd selectedDate={date} />}
      <Card className="w-full">
        <CardContent>
          <div>
            {data.map((item, index) => {
              return <ListItem key={index} item={item} selectedDate={date} />;
            })}
          </div>
        </CardContent>
      </Card>
      <NavDate selectedDate={date} />
    </main>
  );
}
