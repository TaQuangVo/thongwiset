'use client'

import { fromBlob, blobToURL } from 'image-resize-compress';
import { useState, useRef, useEffect } from "react";
import {Comfortaa} from "next/font/google"
import PlusIcon from "./PlusIcon"
import { useSession } from "next-auth/react"
import  DatePicker from "@/components/DatePicker"
import  SelectDish from "@/components/SelectDish"
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"


import * as React from "react"
import { Loader2 } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { DialogPortal } from '@radix-ui/react-dialog';


const comfortaa = Comfortaa({
    subsets: ["latin"],
    weights: ["800"],
    display: "swap",
    adjustFontFallback: false,
})

//luncheItem: the lunchItem to edit or delete, in case of create(POST) will be null
//operation: POST || PATCH || DELETE
//menuItems: all avalable dishes in an array(use to select dish for the lunch item)
export default function MenuEditorButton ({luncheItem, operation, menuItems}) {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false);
    const diableAllFields = operation != 'POST' && operation != 'PATCH'
    const router = useRouter();

    const fileInputRef = useRef(null);
        // State for capturing input field values
        const [formData, setFormData] = useState({
            id: luncheItem ? luncheItem.lunchMenuId : null,
            dishId: luncheItem ? luncheItem.dishId : null,
            date: luncheItem ? luncheItem.date : null
        });

        const handleDateSelect = (value) => {
            setFormData((prevData) => ({
                ...prevData,
                'date': value,
            }));
        }

        const handleDishSelected = (value) => {
            setFormData((prevData) => ({
                ...prevData,
                'dishId': value,
            }));
        }


        function validateInput(input){
            if(input.dishId == null || input.dishId == '')
                return 'Välj en rätt för att fortsätta.'

            if(input.date == null || input.date == '')
                return 'Välj en datum for att fortätta.'

            return null
        }

        const resetForm = () => {
            setFormData({
                id: null,
                dishId: null,
                date: null
            });
        }


        const handleSubmit = async (e) => {
            e.preventDefault()

            const error = validateInput(formData)
            if(error != null){
                toast(error)
                return;
            }


            setIsLoading(true)

            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            if(operation != 'POST' && operation != 'PATCH' &&operation != 'DELETE'){
                toast('Något gått snätt! Ring Ta Quang Yao...')
                return 
            }

            const response = operation == 'POST' ? await fetch("/api/lunchMenu", {
                method: "POST",
                body: data,
            })
            : operation == 'PATCH' ? await fetch("/api/lunchMenu", {
                method: "PATCH",
                body: data,
            }) 
            :  await fetch("/api/lunchMenu", {
                method: "DELETE",
                body: data,
            }) 

            setIsLoading(false)
            if (response.ok) {
                toast("Det gått bra :)");
                resetForm();
                setOpen(false);
                router.refresh();
            } else {
                toast("Något gått snätt! Ring Ta Quang Yao...");
            }
        };

    
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
      }, []);
    
      if (!mounted) {
        // Render nothing (or a fallback) until mounted.
        return null;
      }


    if (!session) {
        return (
          <>
          </>
        )
    }


    return (
        
        <Dialog className={"overflow-y-scroll max-h-screend"} open={open} onOpenChange={setOpen}  modal={false}>
            <DialogTrigger asChild>
                {
                    operation == 'POST' ? 
                        <Button variant="outline" size="icon">
                            <PlusIcon />
                        </Button>
                    : operation == 'PATCH' ?
                    <Button>
                        Redigera
                    </Button>
                    : operation == 'DELETE' ?
                    <Button variant="link" className='px-0 text-red-500'>
                       Radera rätten från lunch menu
                    </Button>
                    : 
                    <Button variant="link" className='hidden'>
                       Obs... 
                    </Button>
                }
            </DialogTrigger>
            <DialogPortal>
            <DialogContent  aria-describedby="dialog">
                <DialogHeader>
                    <DialogTitle>
                        {
                        operation == 'POST' ? 
                            <span className={comfortaa.className + " text-2xl"}>Lägg till lunch menu</span>
                        : operation == 'PATCH' ?
                            <span className={comfortaa.className + " text-2xl"}>Redigera</span>
                        : operation == 'DELETE' ?
                            <span className={comfortaa.className + " text-2xl"}>Ta bort</span>
                        :
                            <span className={comfortaa.className + " text-2xl"}>Obs... Något gått snätt.</span>
                        }
                    </DialogTitle>
                    <DialogDescription asChild>
                    <form id="form"  onSubmit={handleSubmit}>
                            <div className="flex items-start mt-5 mb-5 flex-col">
                                <label htmlFor='datePicker'>Datum</label>
                                <DatePicker disabled={diableAllFields} value={formData.date} id='datePicker' name='datePicker' onSelect={handleDateSelect}/>
                            </div>
                            <div className="flex items-start mt-5 mb-5 flex-col">
                                <label htmlFor='datePicker'>Datum</label>
                                <SelectDish disabled={diableAllFields} value={formData.dishId} dishData = {menuItems} onSelect={handleDishSelected}></SelectDish>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <span className='pt-10'>
                        <Button type='button' variant='link' className=' mr-5' form='form' onClick={() => setOpen(false)}>
                            <span className={comfortaa.className}>Avbryt</span>
                        </Button>
                        {
                        operation == 'POST' ? 
                        <Button type='submit' className='px-11' form='form' disabled={isLoading}>
                            {
                                isLoading && (<Loader2 className="animate-spin" />)
                            }
                            <span className={comfortaa.className}>Lägg till</span>
                        </Button>
                        : operation == 'PATCH' ?
                        <Button type='submit' className='px-11' form='form' disabled={isLoading}>
                            {
                                isLoading && (<Loader2 className="animate-spin" />)
                            }
                            <span className={comfortaa.className}>Redigera</span>
                        </Button>
                        : operation == 'DELETE' ?
                        <Button type='submit' className='px-11 bg-red-600' form='form' disabled={isLoading}>
                            {
                                isLoading && (<Loader2 className="animate-spin" />)
                            }
                            <span className={comfortaa.className}>!!! Radera !!!</span>
                        </Button>
                        :
                        <Button type='submit' className='px-11 bg-red-600' form='form' disabled={isLoading}>
                            {
                                isLoading && (<Loader2 className="animate-spin" />)
                            }
                            <span className={comfortaa.className}>Obs... Något gått snätt.</span>
                        </Button>
                        }
                    </span>
                </DialogFooter>
            </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
