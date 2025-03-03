"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { sv } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverPortal } from "@radix-ui/react-popover"

export default function DatePicker({onSelect, value, disabled}) {
  const [date, setDate] = React.useState(value)
  const [open, setOpen] = React.useState(false)

    // When a date is selected, update state and close the popover.
    const handleSelect = (selectedDate) => {
        setDate(selectedDate)
        onSelect(selectedDate)
        setTimeout(() => {
            setOpen(false)
        }, "300");
    }

  return (
    <Popover modal={true}  open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "EEEE, d MMMM", { locale: sv }) : <span>Välj datum</span>}
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
            <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelect}
                initialFocus
                required
            />
    </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}
