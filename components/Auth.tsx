import { Button } from "./ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function WebsiteAuth() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    return;
  };

  if (!data.user || error) {
    return (
      <div className="flex justify-center">
        <Link href="/login">
          <Button variant={"ghost"} className="items-end">
            Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <form action={signOut} className="inline-flex">
        <Button variant={"ghost"}>Logout</Button>
      </form>
    </div>
  );
}