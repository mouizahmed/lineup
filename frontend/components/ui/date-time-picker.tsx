"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarDays, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type DateTimeValue = {
  date: Date | undefined;
  time: string;
};

type DateTimePickerProps = {
  value: DateTimeValue;
  onChange: (value: DateTimeValue) => void;
  placeholder?: string;
  className?: string;
  disabled?: (date: Date) => boolean;
};

const HOURS = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, "0")
);
const MINUTES = ["00", "15", "30", "45"];

// Stable reference — defined outside the component so it never triggers re-renders
function disablePastDates(date: Date) {
  return date < new Date(new Date().setHours(0, 0, 0, 0));
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "Pick a date & time",
  className,
  disabled,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);

  const [hour, minute] = value.time ? value.time.split(":") : ["", ""];

  function handleDateSelect(date: Date | undefined) {
    onChange({ ...value, date });
  }

  function handleHourChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newHour = e.target.value;
    onChange({ ...value, time: `${newHour}:${minute || "00"}` });
  }

  function handleMinuteChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newMinute = e.target.value;
    onChange({ ...value, time: `${hour || "09"}:${newMinute}` });
  }

  const displayLabel = value.date
    ? `${format(value.date, "MMM d, yyyy")}${value.time ? ` at ${value.time}` : ""}`
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start gap-2 font-normal",
            !value.date && "text-muted-foreground",
            className
          )}
        >
          <CalendarDays className="h-4 w-4 shrink-0" />
          <span className="truncate">{displayLabel}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value.date}
          onSelect={handleDateSelect}
          disabled={disabled ?? disablePastDates}
          autoFocus
        />

        {/* time selector */}
        <div className="border-t border-border px-4 py-3">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            Time
          </p>
          <div className="flex items-center gap-2">
            <select
              value={hour || "09"}
              onChange={handleHourChange}
              className="flex-1 cursor-pointer rounded-md border border-input bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {HOURS.map((h) => (
                <option key={h} value={h}>
                  {h}:00
                </option>
              ))}
            </select>
            <span className="text-sm text-muted-foreground">:</span>
            <select
              value={minute || "00"}
              onChange={handleMinuteChange}
              className="flex-1 cursor-pointer rounded-md border border-input bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {MINUTES.map((m) => (
                <option key={m} value={m}>
                  :{m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* done button */}
        <div className="border-t border-border px-4 py-2">
          <Button
            size="sm"
            className="w-full"
            onClick={() => setOpen(false)}
            disabled={!value.date}
          >
            Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
