import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

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
  import { Check, ChevronsUpDown } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { cn } from "@/lib/utils"



// ImageUploader Component
function ImageUploader({ onImageProcessed }) {
  const [preview, setPreview] = useState(null);
  const [processedImage, setProcessedImage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Calculate center crop square
        const minSide = Math.min(img.width, img.height);
        const sx = (img.width - minSide) / 2;
        const sy = (img.height - minSide) / 2;

        // Create a canvas with 64x64 dimensions
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, 64, 64);

        // Convert canvas to Base64 image (PNG)
        const dataURL = canvas.toDataURL('image/png');
        setProcessedImage(dataURL);
        if (onImageProcessed) {
          onImageProcessed(dataURL);
        }
      };
      img.src = event.target.result;
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-4">
      <Label htmlFor="picture">Upload Image</Label>
      {processedImage && (
        <div className="mb-2">
          <img 
            src={processedImage} 
            alt="Processed" 
            className="mt-1 rounded border border-gray-300" 
            width="64" 
            height="64" 
          />
        </div>
      )}
      <Input id="picture" className='file:font-semibold' type="file" onChange={handleFileChange} accept="image/*" />
    </div>
  );
}

// Main Product Form Component
export default function ProductForm({dishData}) {
    const defaultDishData = {
        title: 'Pad krapao',
        sectionName: '',
        ingredients:
          'Stark basilika, chili, vitlök, brytbönor, lök , champinjoner och paprika. Serveras med ris.',
        note: 'Recomendreas ej för barn',
        price: 'fr. 145',
        discountedPrice: 'fr. 160kr',
        priceDescription: '',
        hideFromMenu: false,
        inLunchMenu: false,
        lunchMenuDate: 'Måndag',
        imageUrl: '',
      }

  const [formData, setFormData] = useState(dishData ? dishData : defaultDishData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleHideFromMenuChange  = (val) => {
    setFormData((prev) => ({
      ...prev,
      hideFromMenu: val,
    }));
  };
  const handleInLunchMenuChange  = (val) => {
    setFormData((prev) => ({
      ...prev,
      inLunchMenu: val,
    }));
  };

  // This callback receives the Base64 image from the ImageUploader
  const handleImageProcessed = (base64Image) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: base64Image,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Product Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Title */}
            <div className="mb-4">
                <Label htmlFor="title">Titel</Label>
                <Input type="text" name='title' id="title" placeholder="Titel" onChange={handleChange} value={formData.title}/>
            </div>

          {/* Ingredients */}
          <div className="mb-4">
                <Label htmlFor="ingredients">Ingredients</Label>
                <Textarea id="ingredients" name='ingredients' placeholder="Ingredients" onChange={handleChange} value={formData.ingredients} rows="3"/>
            </div>


          {/* Note */}
          <div className="mb-4">
                <Label htmlFor="note">Note</Label>
                <Textarea id="note" name='note' placeholder="note" onChange={handleChange} value={formData.note} rows="2"/>
            </div>

          {/* Price & Discounted Price */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
                <Label htmlFor="price">Price</Label>
                <Input type="text" name='price' id="price" placeholder="Price" onChange={handleChange} value={formData.price} required/>
            </div>
            <div>
                <Label htmlFor="discountedPrice">Discounted Price</Label>
                <Input type="text" name='discountedPrice' id="discountedPrice" placeholder="Discounted Price" onChange={handleChange} value={formData.discountedPrice}/>
            </div>
          </div>

          {/* Price Description */}
          <div className="mb-4">
                <Label htmlFor="priceDescription">Price Description</Label>
                <Textarea id="priceDescription" name='priceDescription' placeholder="Price Description" onChange={handleChange} value={formData.priceDescription} rows="2"/>
            </div>

                      {/* Image Uploader */}
          <ImageUploader onImageProcessed={handleImageProcessed} />


          {/* Lunch Menu Date */}
            <div className="mb-4 mt-10 flex items-center space-x-4">
                    <div className="mb-4 flex flex-col">
                        <Label className='mb-1'>Dagen's Lunch</Label>
                        <SelectWeekDay />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="inLunchMenu" checked={formData.inLunchMenu} onCheckedChange={handleInLunchMenuChange}/>
                        <label htmlFor="inLunchMenu" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
                            In Lunch Menu
                        </label>
                    </div>
            </div>
        {/* Checkboxes */}
            <div className="mb-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="hideFromMenu" checked={formData.hideFromMenu} onCheckedChange={handleHideFromMenuChange}/>
                    <label htmlFor="hideFromMenu" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
                        Hide From Main Menu
                    </label>
                </div>
          </div>
          

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-14"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}


   
  export function SelectWeekDay({value, onChange}) {
    const [open, setOpen] = useState(false)
    const [val, setVal] = useState(value ? value : 'Måndag')
    

const weekDays = [
    {
      value: "Måndag",
      label: "Måndag",
    },
    {
      value: "Tisdag",
      label: "Tisdag",
    },
    {
      value: "Onsdag",
      label: "Onsdag",
    },
    {
      value: "Torsdag",
      label: "Torsdag",
    },
    {
      value: "Fredag",
      label: "Fredag",
    },
    {
      value: "Lördag",
      label: "Lördag",
    },
    {
      value: "Söndag",
      label: "Söndag",
    },
  ]

  function handleSelect(currentValue){
    setVal(currentValue === val ? val : currentValue)
    setOpen(false)
  }
   
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {val
              ? weekDays.find((weekday) => weekday.value === val)?.label
              : "Välj dag..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No weekdays found.</CommandEmpty>
              <CommandGroup>
                {weekDays.map((weekday) => (
                  <CommandItem
                    key={weekday.value}
                    value={weekday.value}
                    onSelect={(currentValue) => {
                        handleSelect(currentValue)
                    }}
                  >
                    {weekday.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        val === weekday.value ? "opacity-100" : "opacity-0"
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

  /**
   *                             <p className="mt-5 mb-1">Veckans lunch</p>
                            <div className="flex items-center">
                                <Select onValueChange={handleDayChange}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Välj dag" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value="Måndag">Måndag</SelectItem>
                                            <SelectItem value="Tisdag">Tisdag</SelectItem>
                                            <SelectItem value="Onsdag">Onsdag</SelectItem>
                                            <SelectItem value="Torsdag">Torsdag</SelectItem>
                                            <SelectItem value="Fredag">Fredag</SelectItem>
                                            <SelectItem value="Lördag">Lördag</SelectItem>
                                            <SelectItem value="Söndag">Söndag</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <div className="flex items-center ml-2">
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
                                        Includera i veckans lunchs meny
                                    </label>
                                </div>
                            </div>
   */