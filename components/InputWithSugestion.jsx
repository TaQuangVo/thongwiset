"use client"

import * as React from "react"
import { Check, ChevronsUpDown, TableOfContents } from "lucide-react"

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
import { Input } from "./ui/input"


export default function InputWithSugestion({value, onInputChange, avalableCategories, name, id}) {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState(value ? value : '')
  const inputRef = React.useRef(null)

  function _onInputChange(e){
    setSelectedStatus(e.target.value)
    onInputChange(e)
  }

  function _onSugestionSelected(value){
    setSelectedStatus(
      avalableCategories.find((category) => category === value) ||
        ''
    )
    setOpen(false)
  }

  function onOpenChange(open){
    setOpen(open)
  }

  return (
    <div className="flex items-center space-x-4 w-full mb-5 mt-1">
      <Input required id={id} ref={inputRef} placeholder="" name={name}  value={selectedStatus} onChange={_onInputChange} className="flex-grow flex"/>
      <Popover open={open} modal={true} onOpenChange={onOpenChange} align='end'>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <TableOfContents></TableOfContents>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="end">
          <Command>
            <CommandList>
              <CommandGroup>
                {avalableCategories.map((category) => (
                  <CommandItem
                    key={category}
                    value={category}
                    onSelect={_onSugestionSelected}
                  >
                    {category}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
