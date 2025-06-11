import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Save, Shredder, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormCaloriesEdit } from "./Form-calories-edit";
import { Tables } from "@/utils/supabase/database.types";
import { createClient } from "@/utils/supabase/server";
import { deleteRecord } from "@/data/actions";

type Record = Tables<"records">;

export default async function ListItem({ item, selectedDate }: { item: Record, selectedDate?: string }) {
  if (!item) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex gap-2 justify-between border-b last:border-none py-2 first:pt-0 last:pb-0 items-center">
      <div className="flex gap-4 items-center">
        <div>{item.title}</div>
        {user && (
          <div className="flex gap-2">
          <FormCaloriesEdit id={item.id} title={item.title || ""} calories={item.calories.toString()} selectedDate={selectedDate} />
          <Dialog>
            <DialogTrigger asChild>
                <Shredder strokeWidth={1.25} className="text-neutral-500 size-5 hover:text-white" />
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
              </DialogHeader>
              <div className="flex gap-2">
                <form action="">
                  <input type="hidden" name="id" value={item.id} />
                  <Button
                    variant={"destructive"}
                    type="submit"
                    formAction={deleteRecord}
                  >
                    <Shredder /> Delete
                  </Button>
                </form>
                <DialogClose asChild autoFocus>
                  <Button variant={"secondary"}>Cancel</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          </div>
        )}
      </div>
      <div>
        {item.calories}
      </div>
    </div>
  );
}
