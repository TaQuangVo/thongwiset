'use client'

import { fromBlob, blobToURL } from 'image-resize-compress';
import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea"
import {Comfortaa} from "next/font/google"
import PlusIcon from "./PlusIcon"
import { useSession } from "next-auth/react"
import { Checkbox } from "@/components/ui/checkbox"
import  InputWithSugestion from "@/components/InputWithSugestion"
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import {DEFAULT_IMAGE_URL} from './../constant/const'

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
import { Loader2, Pen, Trash2 } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { DialogPortal } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';


const comfortaa = Comfortaa({
    subsets: ["latin"],
    weights: ["800"],
    display: "swap",
    adjustFontFallback: false,
})

//menuItem: the menu item that wanted to update or delete. in case of create will be null
//avalableCategories: all avalable categories of the menu
//operation: POST || PATCH || DELETE
export default function MenuEditorButton ({menuItem, avalableCategories, operation}) {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false);
    const diableAllFields = operation != 'POST' && operation != 'PATCH'
    const router = useRouter();

    const fileInputRef = useRef(null);
        const [imageUploacPreview, setImageUploadPreview] = useState(null)

        // State for capturing input field values
        const [formData, setFormData] = useState({
            id: menuItem ? menuItem.id : null,
            categoryName: menuItem ? menuItem.categoryName : '',
            ingredients: menuItem ? menuItem.ingredients : '',
            price: menuItem ? menuItem.price : '',
            discountedPrice: menuItem ? menuItem.discountedPrice : '',
            priceDescription: menuItem ? menuItem.priceDescription : '',
            title: menuItem ? menuItem.title : '',
            note: menuItem ? menuItem.note : '',
            imageUrl: menuItem ? menuItem.imageUrl : null,
            hideFromMenu: menuItem ? menuItem.hideFromMenu : false,
        });

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        };

        const handleCategoryChange = (value) => {
            setFormData((prevData) => ({
                ...prevData,
                'categoryName': value,
            }));
        };

        function validateInput(input) {
            if (!input.title || input.title.trim() === '') {
              return 'Titeln är obligatorisk. Vänligen välj en rätt för att fortsätta.';
            }
            if (!input.categoryName || input.categoryName.trim() === '') {
              return 'Kategorinamn krävs.';
            }
            if (!input.ingredients || input.ingredients.trim() === '') {
              return 'Ingredienser måste anges.';
            }
            if (!input.price || input.price.trim() === '') {
              return 'Pris måste anges.';
            }
            return null;
          }

        const handleFileChange = async(e) => {
            setIsLoading(true)
            const file = e.target.files[0];
            const resized = await BlobFileToDataUrl(file)
            const resizedFile = new File([resized.resizedBlob], file.name, { type: resized.resizedBlob.type });

            setFormData((prevData) => ({
                ...prevData,
                imageUrl: resizedFile,
            }));
            setImageUploadPreview(resized.url);
            setIsLoading(false)
        };

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
                // Optionally convert non-string values to string if needed
                if(key != 'imageUrl'){
                    data.append(key, value);
                }else if(key == 'imageUrl' && value != null){
                    data.append(key, value);
                }
            });

            if(operation != 'POST' && operation != 'PATCH' &&operation != 'DELETE'){
                alert('Något gått snätt! Ring Ta Quang Yao ...')
                return 
            }

            const response = operation == 'POST' ? await fetch("/api/menu", {
                method: "POST",
                body: data,
            })
            : operation == 'PATCH' ? await fetch("/api/menu", {
                method: "PATCH",
                body: data,
            }) 
            :  await fetch("/api/menu", {
                method: "DELETE",
                body: data,
            }) 
            
            setIsLoading(false)
            if (response.ok) {
                toast("Det gått bra :)");
                setOpen(false)
                router.refresh();
            } else {
                alert("Något gått snätt! Ring Ta Quang Yao ...");
            }
        };

        const handleClick = () => {
            if(diableAllFields)
                return

            if(!formData.imageUrl && !imageUploacPreview) {
                fileInputRef.current?.click();
            }else{
                setFormData({...formData, imageUrl: null})
                setImageUploadPreview(null)
                fileInputRef.current.value=null
            }
          };

        const BlobFileToDataUrl = async (blobFile) => {
            const quality = 80; // For webp and jpeg formats
            const width = '350'; // Original width
            const height = 'auto'; // Original height
            const format = 'jpg'; // Output format

            if(!blobFile) return null
        
            try {
              const resizedBlob = await fromBlob(blobFile, quality, width, height, format);
              const url = await blobToURL(resizedBlob);
              return {
                resizedBlob,
                url
              }
            } catch (error) {
               alert('Något gått snätt! Ring Ta Quang Yao...');
              return null
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
        <Dialog className={"overflow-y-scroll max-h-screend"} open={open} onOpenChange={setOpen}>
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
                       Radera rätten 
                    </Button>
                    : 
                    <Button variant="link" className='hidden'>
                       Obs... 
                    </Button>
                }
            </DialogTrigger>
            <DialogPortal>
            <DialogContent aria-describedby="dialog"  onOpenAutoFocus={e => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>
                        {
                        operation == 'POST' ? 
                            <span className={comfortaa.className + " text-2xl"}>Lägg till</span>
                        : operation == 'PATCH' ?
                            <span className={comfortaa.className + " text-2xl"}>Redigera</span>
                        : operation == 'DELETE' ?
                            <span className={comfortaa.className + " text-2xl"}>Radera</span>
                        :
                            <span className={comfortaa.className + " text-2xl"}>Obs... Något gått snätt.</span>
                        }
                    </DialogTitle>
                    <DialogDescription asChild>
                    <form id="form"  onSubmit={handleSubmit} >
                        <div className='pt-10 text-left' >
                            <Label htmlFor='title' className="mt-5 mb-1">Namn*</Label>
                            <Input
                                disabled={diableAllFields}
                                id="title"
                                name="title"
                                className="mb-5 mt-1"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                            <Label htmlFor='categoryName' className="mt-5 mb-1">Category namn*</Label>
                            <InputWithSugestion disabled={diableAllFields} value={formData.categoryName} id='categoryName' name='categoryName' onInputChange={handleCategoryChange} avalableCategories={avalableCategories}></InputWithSugestion>

                            <Label htmlFor='ingredients'>Ingrediens*</Label>
                            <Textarea
                                disabled={diableAllFields}
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
                                        disabled={diableAllFields}
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
                                        disabled={diableAllFields}
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
                                disabled={diableAllFields}
                                id="priceDescription"
                                name="priceDescription"
                                className="mb-5 mt-1"
                                value={formData.priceDescription}
                                onChange={handleInputChange}
                            />
                            <Label htmlFor='note' className="mt-5 mb-1">Note</Label>
                            <Textarea
                                disabled={diableAllFields}
                                id="note"
                                name="note"
                                className="mb-5 mt-1"
                                value={formData.note}
                                onChange={handleInputChange}
                            />

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="imageUrl" className=" mb-1">Bild</Label>
                                <div 
                                    className={diableAllFields ? "relative w-28 h-28 border rounded-md overflow-hidden cursor-not-allowed":'relative w-28 h-28 border rounded-md overflow-hidden cursor-pointer'} 
                                    onClick={handleClick} >
                                    { imageUploacPreview ? (
                                        <img src={imageUploacPreview} alt="Preview" className="object-cover w-full h-full" />
                                    ) 
                                    : formData.imageUrl
                                    ? (<img src={formData.imageUrl} alt="Preview" className="object-cover w-full h-full" />)
                                    : (
                                        <div className="flex items-center justify-center w-full h-full bg-gray-100">
                                            <img src={DEFAULT_IMAGE_URL} alt="Preview" className="object-cover w-full h-full" />
                                        </div>
                                    )}
                                    {/* Overlay icon on hover */}
                                    <div className={diableAllFields ? "absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-70 transition-opacity " :  "absolute inset-0 flex items-center justify-center opacity-0  bg-black bg-opacity-70 transition-opacity hover:opacity-100" }>
                                        {!formData.imageUrl && !imageUploacPreview ?
                                            <Pen  color="#ffffff" /> :
                                            <Trash2 color="#ffffff" />
                                        }
                                    </div>
                                </div>
                                <input
                                    disabled={diableAllFields}
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
                                    disabled={diableAllFields}
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
                        </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <span className='pt-10 w-full flex justify-end'>
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
