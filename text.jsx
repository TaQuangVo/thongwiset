import Image from "next/image"
import Link from 'next/link'
import {Dancing_Script, Comfortaa} from "next/font/google"
import { fromBlob, blobToURL } from 'image-resize-compress';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import {menuDataMock} from '@/constant/dataMock.js'
import MenuEditorButton from '@/components/AddMenuSectionButton'


const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weights: [400],
    display: "swap",
    adjustFontFallback: false,
})

const comfortaa = Comfortaa({
    subsets: ["latin"],
    weights: ["800"],
    display: "swap",
    adjustFontFallback: false,
})



function MenuItem({dishData}){
    const title = dishData.title
    const ingredients = dishData.ingredients
    const note = dishData.note
    const currentPrice = (dishData.discountedPrice && dishData.discountedPrice != '') ? dishData.discountedPrice : dishData.price
    const prevPrice = !(dishData.discountedPrice && dishData.discountedPrice != '') ? dishData.discountedPrice : dishData.price
    const priceDescription = dishData.priceDescription
    const hideFromMenu = dishData.hideFromMenu
    const imageUrl = dishData.imageUrl

    const inLunchMenu = dishData.inLunchMenu
    const lunchMenuDate = dishData.lunchMenuDate

    const today = new Date();
    const swedishDayOfWeek = today.toLocaleDateString('sv-SE', { weekday: 'long' });
    const capitalizedDay = swedishDayOfWeek.charAt(0).toUpperCase() + swedishDayOfWeek.slice(1);


    const showLuchMenuIndicator = inLunchMenu && (lunchMenuDate == capitalizedDay)

    const classNameWithBorder = "relative m-5 border border-[#FACE8D] py-5 mb-6 rounded-2xl cursor-pointer hover:bg-neutral-900"
    const classNameWithoutBorder = "relative m-5 py-5 mb-6 rounded-2xl cursor-pointer hover:bg-neutral-900"

    if(hideFromMenu)
        return <></>


    return (
        <Dialog>
            <DialogTrigger asChild>

            <div className={showLuchMenuIndicator ? classNameWithBorder : classNameWithoutBorder}>
                {
                    showLuchMenuIndicator && (
                        <div className="absolute top-0 right-0 ">
                            <p className={comfortaa.className + " py-1 px-3 bg-[#FACE8D] rounded -translate-y-1/2 -translate-x-1/3 text-sm"}>Dagens lunch</p>
                        </div>
                    )
                }
                <div className="flex items-center mx-5">
                    <div className="relative w-20 h-20 min-w-20 rounded-xl overflow-hidden">
                        <div className="absolute w-full h-full bg-black opacity-20 top-0 left-0"></div>
                        {
                            (imageUrl && imageUrl != '') ? (
                                <img 
                                    src={imageUrl}
                                    alt="image of thailand food"
                                    className="w-full h-full"
                                />
                            ) : (
                                <img 
                                    src='food-ill.avif'
                                    alt="image of thailand food"
                                    className="w-full h-full"
                                />
                            )
                        }
                    </div>
                    <div className="text-white flex-grow pl-7 overflow-hidden">
                        <div className=" flex justify-between content-between text-lg mb-2">
                            <h3 className={comfortaa.className}>{title}</h3>
                            <div className="flex">
                                <p className={comfortaa.className + ' opacity-40 line-through mr-2'}>{prevPrice}</p>
                                <p className={comfortaa.className}>{currentPrice}</p>
                            </div>
                        </div>
                        <p  className={comfortaa.className + " opacity-65 text-nowrap overflow-hidden text-ellipsis mr-20"}>{ingredients}</p>
                        <p  className={comfortaa.className + " opacity-65 text-nowrap overflow-hidden text-ellipsis mr-20"}>{priceDescription}</p>
                    </div>
                </div>
            </div>

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle><span className={comfortaa.className + " text-2xl"}>{title}</span></DialogTitle>
                <DialogDescription>
                    <span className={comfortaa.className + " mt-5 block"}><span className={comfortaa.className + " font-bold text-black"}>Price:</span> <span  className={comfortaa.className + " line-through opacity-50"}>{prevPrice}</span> {currentPrice}</span>

                    <span className={comfortaa.className + " mt-3 block"}><span className={comfortaa.className + " font-bold text-black"}>Ingrediens:</span> {ingredients}</span>

                    {
                        (priceDescription && priceDescription != '') && (
                            <span className={comfortaa.className + " mt-3 block"}><span className={comfortaa.className + " font-bold text-black"}>Pris variant:</span> {priceDescription}</span>
                        )
                    }
                    
                    {
                        (note && note != '') && (
                            <span className={comfortaa.className + " mt-3 block"}><span  className={comfortaa.className + " font-bold text-black"}>Chef note:</span> {note}</span>
                        )
                    }
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        
    )
}


function MenuSection({sectionData}){
    const sectionTitle = sectionData.title
    const dishesData = sectionData.dishes

    return (
        <div className="w-full mb-20 mt-20">
            <section className="max-w-4xl">
                <h2 className={dancingScript.className + ' text-[#FACE8D] text-5xl mb-9 ml-10'}>{sectionTitle}</h2>
                <div>
                    {
                        dishesData.map(dishData => <MenuItem dishData={dishData} key={dishData.id}/>)
                    }
                </div>
            </section>
        </div>
    )
}

export default function Menu() {
    const menuData = menuDataMock
    const menuSections = menuData.sections
    return (
        <div className="w-screen bg-[#050505] flex flex-row">
            <div className="w-1/2 h-lvh overflow-hidden max-h-lvh sticky top-0 left-0">
                <div className="w-full h-full bg-black opacity-20 absolute z-40"></div>
                <div className="relative w-full h-full z-50 flex justify-center items-center">
                    <div>
                        <h1 className={dancingScript.className + ' text-[#FACE8D] text-center text-4xl'}>Titta på</h1>
                        <h2 className={comfortaa.className + ' text-white text-center text-6xl'}>Vår meny</h2>
                    </div>
                </div>
                <div className="w-full absolute top-0 left-0 z-50 p-6">
                    <Link href="/home"><p className={comfortaa.className + ' text-white text-xl text-center'}>Thongwiset.</p></Link>
                </div>
                <div className="w-full min-h-full h-auto absolute bottom-0 left-0">
                    <Image 
                        src='/menu-hero.png' 
                        alt="image of thailand food"
                        width={840}
                        height={1260}
                        style={{objectFit: "cover", minHeight:"100lvh", minWidth: "100%"}}
                        />
                </div>
            </div>

            <div className="w-1/2">
                <div className="overflow-hidden sticky top-0 right-0 bg-black z-50">
                    <div className="flex justify-center py-6">
                    {
                        menuSections.map(sectionData => <span className={comfortaa.className + ' text-white mx-4 text-nowrap'} key={sectionData.id}>{sectionData.title}</span> )
                    } 
                    </div>
                </div>
                {
                    menuSections.map(sectionData => <MenuSection sectionData={sectionData} key={sectionData.id}/> )
                }
                <MenuEditorButton menuSections={menuSections}/>
            </div>
        </div>
    )
}