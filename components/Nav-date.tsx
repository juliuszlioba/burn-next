'use client';

import * as React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export function NavDate({selectedDate} : {selectedDate: string}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  function navigate(dateSlug: Date | undefined) {
    if (!dateSlug) return null;
    const nextPage = format(dateSlug, 'yyyy-MM-dd');
    return router.push(nextPage);
  }

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-between font-normal"
          >
            {'Date'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="center">
          <Calendar
            mode="single"
            selected={new Date(`${selectedDate}`)}
            captionLayout="dropdown"
            onSelect={(date) => {
              setOpen(false);
              navigate(date);
            }}
          />
        </PopoverContent>
      </Popover>
      <Button
        variant="outline"
        id="date"
        className="justify-between font-normal"
        asChild
      >
        <Link href="/">Today</Link>
      </Button>
    </div>
  );
}
