'use client'

import { fromBlob, blobToURL } from 'image-resize-compress';
import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea"
import {Comfortaa} from "next/font/google"
import { Button as RoundButton } from "@/components/ui/roundButton"
import PlusIcon from "./PlusIcon"
import { useSession } from "next-auth/react"
import { Checkbox } from "@/components/ui/checkbox"
import  DatePicker from "@/components/DatePicker"
import  InputWithSugestion from "@/components/InputWithSugestion"
import {handleUpload} from './../app/actions/menu'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "./ui/input"


import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Pen } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DialogPortal } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';

//const dancingScript = Dancindatag_Script({
//    subsets: ["latin"],
//    weights: [400]
//})

const comfortaa = Comfortaa({
    subsets: ["latin"],
    weights: ["800"]
})


export default function AddMenuSectionButton ({menuItem, avalableCategories}) {
    const { data: session } = useSession()

    //const sectionsTemp = []
    //menuSections.map(section => {
    //    sectionsTemp.push({
    //        value: section.title,
    //        label: section.title
    //    })
    //})


    const fileInputRef = useRef(null);

        // State for capturing input field values
        const [formData, setFormData] = useState({
            id: menuItem ? menuItem.id : null,
            categoryName: menuItem ? menuItem.categoryName : '',
            ingredients: menuItem ? menuItem.ingredients : '',
            price: menuItem ? menuItem.price : '',
            discountedPrice: menuItem ? menuItem.discountedPrice : '',
            priceDescription: menuItem ? menuItem.priceDescription : '',
            note: menuItem ? menuItem.note : '',
            imageUrl: menuItem ? menuItem.imageUrl : null,
            lunchMenuDate: menuItem ? calcIsInLunchMenu(menuItem.inLunchMenu, menuItem.lunchMenuDate).lunchMenuDate : null,
            inLunchMenu:  menuItem ? calcIsInLunchMenu(menuItem.inLunchMenu, menuItem.lunchMenuDate).inLunchMenu : false,
            hideFromMenu: menuItem ? menuItem.hideFromMenu : false,
        });

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        };

        const handleFileChange = async(e) => {
            const file = e.target.files[0];
            const dataUrl = await BlobFileToDataUrl(file)
            console.log(dataUrl)
            setFormData((prevData) => ({
                ...prevData,
                imageUrl: dataUrl,
            }));
        };

        const handleDayChange = (value) => {
            setFormData((prevData) => ({
                ...prevData,
                lunchMenuDate: value,
            }));
        };

        const handleSubmit = async (e) => {
            console.log('submited')

            const response = await fetch("/api/menu", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data:  formData}),
            });
        
            if (response.ok) {
                alert("Data saved successfully!");
            } else {
                alert("Something went wrong!");
            }
        };

        const handleClick = () => {
            fileInputRef.current?.click();
          };

        const BlobFileToDataUrl = async (blobFile) => {
            const quality = 80; // For webp and jpeg formats
            const width = '150'; // Original width
            const height = 'auto'; // Original height
            const format = 'jpg'; // Output format

            if(!blobFile) return null
        
            try {
              const resizedBlob = await fromBlob(blobFile, quality, width, height, format);
              const url = await blobToURL(resizedBlob);
              return url
            } catch (error) {
              console.error('Error processing the Blob:', error);
              return null
            }
          };



    if (!session) {
        return (
          <>
          </>
        )
      }

      return (
        <Dialog className={"overflow-y-scroll max-h-screend"}>
            <DialogTrigger asChild>
                <div className="flex justify-center mb-9">
                    <RoundButton variant="outline" size="icon" className="ml-10">
                        <PlusIcon />
                    </RoundButton>
                </div>
            </DialogTrigger>
            <DialogPortal>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle><span className={comfortaa.className + " text-2xl"}>Lägg till rätt</span></DialogTitle>
                    <DialogDescription asChild>
                    <form id="form"  onSubmit={handleSubmit}>
                        <div className='pt-10 text-left' >
                            <Label htmlFor='title' className="mt-5 mb-1">Namn*</Label>
                            <Input
                                id="title"
                                name="title"
                                className="mb-5 mt-1"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <Label htmlFor='categoryName' className="mt-5 mb-1">Category namn*</Label>
                            <InputWithSugestion value={formData.categoryName} id='categoryName' onInputChange={handleInputChange} avalableCategories={avalableCategories}></InputWithSugestion>

                            <Label htmlFor='ingredients'>Ingrediens*</Label>
                            <Textarea
                                id="ingredients"
                                name="ingredients"
                                className="mb-5 mt-1"
                                value={formData.ingredients}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="flex">
                                <div>
                                    <Label htmlFor='price' className="mt-5 mb-1">Pris*</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        className="mb-5 mt-1"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="ml-7">
                                    <Label htmlFor='discountedPrice' className="mt-5 mb-1">Rabatterade Pris</Label>
                                    <Input
                                        id="discountedPrice"
                                        className="mb-5 mt-1"
                                        name="discountedPrice"
                                        value={formData.discountedPrice}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <Label htmlFor='priceDescription' className="mt-5 mb-1">Pris Variant</Label>
                            <Textarea
                                id="priceDescription"
                                name="priceDescription"
                                className="mb-5 mt-1"
                                value={formData.priceDescription}
                                onChange={handleInputChange}
                            />
                            <Label htmlFor='note' className="mt-5 mb-1">Note</Label>
                            <Textarea
                                id="note"
                                name="note"
                                className="mb-5 mt-1"
                                value={formData.note}
                                onChange={handleInputChange}
                            />

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="imageUrl" className=" mb-1">Bild</Label>
                                <div 
                                    className="relative w-28 h-28 border rounded-md overflow-hidden cursor-pointer"
                                    onClick={handleClick}
                                >
                                    {formData.imageUrl ? (
                                    <img src={formData.imageUrl} alt="Preview" className="object-cover w-full h-full" />
                                    ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                                        <img src='food-ill.avif' alt="Preview" className="object-cover w-full h-full" />
                                    </div>
                                    )}
                                    {/* Overlay icon on hover */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
                                    <Pen />
                                    </div>
                                </div>
                                <input
                                    id="imageUrl"
                                    type="file"
                                    name="imageUrl"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                                </div>

                            <div className="flex items-center mt-5 mb-5">
                                <Checkbox
                                    id="hideFromMenu"
                                    name="hideFromMenu"
                                    checked={formData.hideFromMenu}
                                    onCheckedChange={(checked) =>
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            hideFromMenu: checked,
                                        }))
                                    }/>
                                <label
                                    htmlFor="hideFromMenu"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                                >
                                    Hide from menu
                                </label>
                            </div>

                            <div className='w-full h-px bg-black opacity-55 mt-8'></div>

                            <div className="flex items-center mt-4">
                                <div className="flex items-center">
                                    <Checkbox
                                        id="includeInLunchMenu"
                                        name="includeInLunchMenu"
                                        checked={formData.includeInLunchMenu}
                                        onCheckedChange={(checked) =>
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                includeInLunchMenu: checked,
                                            }))
                                        }
                                    />
                                    <label
                                        htmlFor="includeInLunchMenu"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                                    >
                                        Veckans Lunch Menu
                                    </label>
                                </div>
                            </div>
                            <div className="flex items-start mt-5 mb-5 flex-col">
                                <label htmlFor='datePicker'>Datum</label>
                                <DatePicker id='datePicker'/>
                            </div>
                        </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type='submit' className='px-11' form='form'>
                        Lägg till
                    </Button>
                </DialogFooter>
            </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
