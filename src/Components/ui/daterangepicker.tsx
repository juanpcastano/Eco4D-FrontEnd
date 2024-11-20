"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"

export function DatePickerWithRange({
  className,
  dateRange,
  setDateRange,
}: React.HTMLAttributes<HTMLDivElement> & {
  dateRange: [Date | null, Date | null];
  setDateRange: (range: [Date | null, Date | null]) => void;
}) {
  const [localDate, setLocalDate] = React.useState<DateRange | undefined>({
    from: dateRange[0] || undefined,
    to: dateRange[1] || undefined,
  });

  React.useEffect(() => {
    if (localDate?.from && localDate?.to) {
      setDateRange([localDate.from, localDate.to]);
    }
  }, [localDate, setDateRange]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !localDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {localDate?.from ? (
              localDate.to ? (
                <>
                  {format(localDate.from, "LLL dd, y")} -{" "}
                  {format(localDate.to, "LLL dd, y")}
                </>
              ) : (
                format(localDate.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={localDate?.from}
            selected={localDate}
            onSelect={setLocalDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
