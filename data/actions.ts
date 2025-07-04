"use server";

import { addFormSchema } from "@/components/Form-calories-add";
import { createClient } from "@/utils/supabase/server";
import { editFormSchema } from "@/components/Form-calories-edit";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { toInt } from "radash";
import { z } from "zod";

export async function createRecord(data: z.infer<typeof addFormSchema>) {
  const supabase = await createClient();

  // User check
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/error");
  }

  const dataLoad = {
    title: data.item,
    calories: toInt(data.amount) || 0,
    created_at: data.created_at,
  };

  const { error: resError } = await supabase.from("records").insert(dataLoad);

  if (resError) {
    return { data: null, error: resError };
  }

  revalidatePath("/");

  return { data: { status: "success" }, error: null };
}

export async function readTodaysData() {
  const supabase = await createClient();

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Get tomorrow's date at the start of the day (midnight UTC)
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(today.getUTCDate() + 1);

  const { data } = await supabase
    .from("records")
    .select("*")
    .gte("created_at", today.toISOString()) // Records greater than or equal to today's start
    .lt("created_at", tomorrow.toISOString()) // Records less than tomorrow's start
    .order("created_at", { ascending: false });

  return data || [];
}

export async function readDateData(date: String) {
  const supabase = await createClient();

  // Set the targetDate to the start of the day in UTC
  const startOfDay = new Date(`${date}`);
  startOfDay.setUTCHours(0, 0, 0, 0);

  // Get the start of the next day in UTC
  const endOfDay = new Date(startOfDay);
  endOfDay.setUTCDate(startOfDay.getUTCDate() + 1);

  const { data } = await supabase
    .from("records")
    .select("*")
    .gte("created_at", startOfDay.toISOString()) // Records greater than or equal to today's start
    .lt("created_at", endOfDay.toISOString()) // Records less than tomorrow's start
    .order("created_at", { ascending: false });

  return data || [];
}

export async function updateRecord(data: z.infer<typeof editFormSchema>) {
  const supabase = await createClient();

  // User check
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/error");
  }

  const dataLoad = {
    title: data.item,
    calories: toInt(data.amount) || 0,
    created_at: data.created_at,
  };

  const { error: resError } = await supabase
    .from("records")
    .update(dataLoad)
    .eq("id", toInt(data.id));

  if (resError) {
    return { data: null, error: resError };
  }

  revalidatePath("/");

  return { data: { status: "success" }, error: null };
}

export async function deleteRecord(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const data = {
    id: formData.get("id") as string,
  };

  // User check
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/error");
  }

  // Remove record
  const { error: resError } = await supabase
    .from("records")
    .delete()
    .eq("id", toInt(data.id));

  if (resError) {
    redirect("/error");
  }

  // Clear cache and redirect
  revalidatePath("/");
  redirect(`/`);
}

export async function readChartData() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("totals")
    .select("*")
    .order("date", { ascending: true });

  return data || [];
}

export async function createChartDataForDate(date: string) {
  const supabase = await createClient();

  // User check
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    redirect("/error");
  }

  // Set the targetDate to the start of the day in UTC
  const startOfDay = new Date(`${date}`);
  startOfDay.setUTCHours(0, 0, 0, 0);

  // Get the start of the next day in UTC
  const endOfDay = new Date(startOfDay);
  endOfDay.setUTCDate(startOfDay.getUTCDate() + 1);

  // Get records
  const { data, error } = await supabase
    .from("records")
    .select("*")
    .gte("created_at", startOfDay.toISOString()) // Records greater than or equal to today's start
    .lt("created_at", endOfDay.toISOString()) // Records less than tomorrow's start
    .order("created_at", { ascending: false });

  if (error) {
    return { data: null, error: error };
  }

  // Calculate total calories
  let totalCalories = 0;
  for (let i = 0; i < data.length; i++) {
    totalCalories += data[i].calories;
  }

  // check for existing record
  const { data: existingData } = await supabase
    .from("totals")
    .select("*")
    .eq("date", date.toString());

  // if record exists, update it
  if (existingData && existingData.length > 0) {
    const { error: resError } = await supabase
      .from("totals")
      .update({ calories: totalCalories })
      .eq("id", existingData[0].id);
    if (resError) {
      return { data: null, error: resError };
    }
  } else {
    const { error: resError } = await supabase.from("totals").insert({
      date,
      calories: totalCalories,
    });
    if (resError) {
      return { data: null, error: resError };
    }
  }

  return { data: { status: "success" }, error: null };
}
