import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 p-8">
      <p>Sorry, something went wrong</p>
      <Link href="/">
        <Button className="pb-1.5 pt-2">Return</Button>
      </Link>
    </div>
  );
}