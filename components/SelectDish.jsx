"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function SelectDish({dishData, value, onSelect, disabled}) {
  const [open, setOpen] = React.useState(false)
  const [dishId, setDishId] = React.useState(value)

  const _onSelect = (selected) => {
    const id = dishData.find((dish) => dish.title === selected).id
    setDishId(id)
    setOpen(false)
    onSelect(id)
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          disabled = {disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={!disabled ? 'w-[200px] justify-between' : 'w-[200px] justify-between pointer-events-none cursor-not-allowed'}
        >
          {dishId
            ? dishData.find((dish) => dish.id === dishId)?.title
            : "Valj en rätt"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Söka efter en rätt ..." className="h-9" style={{ pointerEvents: "auto" }}/>
          <CommandList>
            <CommandEmpty>Hittar inte...</CommandEmpty>
            <CommandGroup>
              {dishData.map((dish) => (
                <CommandItem
                  key={dish.id}
                  value={dish.title}
                  onSelect={_onSelect}
                >
                  {dish.title}
                  <Check
                    className={cn(
                      "ml-auto",
                      dishId === dish.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
