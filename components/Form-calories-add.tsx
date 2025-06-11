'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createRecord } from '@/data/actions';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const addFormSchema = z.object({
  item: z.string().min(2, {
    message: 'Min 2 char',
  }),
  amount: z.string(),
  created_at: z.date(),
});

export function FormCaloriesAdd({ selectedDate }: { selectedDate?: string }) {

  const router = useRouter();

  // 1. Define form.
  const form = useForm<z.infer<typeof addFormSchema>>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      item: '',
      amount: "0",
      created_at: selectedDate ? new Date(`${selectedDate}`) : new Date(),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addFormSchema>) {
    const { data, error } = await createRecord(values);

    if (error) {
      console.log(error);
    }

    if (data?.status === "success") {
      form.reset({
        item: "",
        amount: "0",
        created_at: selectedDate ? new Date(`${selectedDate}`) : new Date(),
      });
    }

    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="item"
          render={({ field }) => (
            <FormItem>
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
                <Input type="number" placeholder="amount" className="h-12" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="hidden" placeholder="created_at" className="h-12" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="h-12">Add</Button>
      </form>
    </Form>
  );
}
