"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";
import { updateRecord } from "@/data/actions";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const editFormSchema = z.object({
  id: z.number(),
  item: z.string().min(2, {
    message: "Min 2 char",
  }),
  amount: z.string(),
  created_at: z.string(),
});

export function FormCaloriesEdit({
  id,
  title,
  calories,
  selectedDate,
}: {
  id: number;
  title?: string;
  calories: string;
  selectedDate?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // 1. Define form.
  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      id: id,
      item: title || "",
      amount: calories,
      created_at: selectedDate
        ? new Date(`${selectedDate}`).toISOString()
        : new Date().toISOString(),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof editFormSchema>) {
    const { data, error } = await updateRecord(values);

    if (error) {
      console.log(error);
    }

    if (data?.status === "success") {
      setOpen(false);
    }

    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <SquarePen
          strokeWidth={1.25}
          className="text-neutral-500 size-5 hover:text-white"
        />
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 flex-col justify-center">
          {/* <FormCaloriesEdit id={item.id} title={item.title || ""} calories={item.calories.toString()} selectedDate={selectedDate} /> */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 w-full"
            >
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="item"
                  render={({ field }) => (
                    <FormItem className="w-2/3">
                      <FormControl>
                        <Input placeholder="item" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="w-1/3">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="amount"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input type="hidden" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="created_at"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input type="hidden" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Change</Button>
                <DialogClose asChild autoFocus>
                  <Button variant={"secondary"}>Cancel</Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
