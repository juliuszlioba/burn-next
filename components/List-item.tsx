import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Shredder } from "lucide-react";
import { Tables } from "@/utils/supabase/database.types";
import { createClient } from "@/utils/supabase/server";
import { deleteRecord } from "@/data/actions";

type Record = Tables<"records">;

export default async function ListItem({ item }: { item: Record }) {
  if (!item) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex gap-2 justify-between border-b last:border-none py-1 first:pt-0 last:pb-0 items-center">
      <div className="flex gap-2 items-center">
        <div>{item.title}</div>
        {user && (
          <Dialog>
            <DialogTrigger asChild>
              <Shredder
                className="cursor-pointer rounded hover:bg-muted"
                strokeWidth={1.25}
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
              </DialogHeader>
              <div className="flex gap-2 justify-center">
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
        )}
      </div>
      <div>
        {item.calories}
      </div>
    </div>
  );
}
