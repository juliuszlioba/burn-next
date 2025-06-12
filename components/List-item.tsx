import { FormCaloriesEdit } from "./Form-calories-edit";
import { Tables } from "@/utils/supabase/database.types";
import { createClient } from "@/utils/supabase/server";

type Record = Tables<"records">;

export default async function ListItem({
  item,
  selectedDate,
}: {
  item: Record;
  selectedDate?: string;
}) {
  if (!item) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex gap-2 justify-between border-b last:border-none py-2 first:pt-0 last:pb-0 items-center">
      <div className="flex gap-2 items-center">
        <div>{item.title}</div>
        {user && (
          <FormCaloriesEdit
            id={item.id}
            title={item.title || ""}
            calories={item.calories.toString()}
            selectedDate={selectedDate}
          />
        )}
      </div>
      <div>{item.calories}</div>
    </div>
  );
}
