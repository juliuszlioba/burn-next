import { Card, CardContent } from "@/components/ui/card";

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
        <h1>{date}</h1>
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
      <h1>{date}</h1>
      <Card className="w-full text-center">
        <CardContent>
          <div className="text-2xl">{getTotalCalories(data)} kcal</div>
        </CardContent>
      </Card>
      {user && <FormCaloriesAdd selectedDate={date} />}
      <Card className="w-full">
        <CardContent>
          <div>
            {data.map((item, index) => {
              return <ListItem key={index} item={item} />;
            })}
          </div>
        </CardContent>
      </Card>
      <NavDate selectedDate={date} />
    </main>
  );
}
