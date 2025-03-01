import Image from "next/image"
import Link from 'next/link'
import {Dancing_Script, Comfortaa} from "next/font/google"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import AddMenuSectionButton from '@/components/AddMenuSectionButton'
import TripadvisorIcon from '@/components/TripadvisorIcon'
import { Clock, Copyright, MapPinHouseIcon, Phone } from "lucide-react";
import  DatePicker from "@/components/DatePicker"
import  InputWithSugestion from "@/components/InputWithSugestion"


const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weights: [400]
})

const comfortaa = Comfortaa({
    subsets: ["latin"],
    weights: ["800"]
})



function MenuItem({dishData, showTodayLunchIndicator}){
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


    const showLuchMenuIndicator = (inLunchMenu && showTodayLunchIndicator) && (lunchMenuDate == capitalizedDay)

    const classNameWithBorder = "relative m-2 border border-[#FACE8D] py-4 mt-6 rounded-2xl cursor-pointer hover:bg-neutral-900 2xl:m-5 2xl:py-5"
    const classNameWithoutBorder = "relative m-2 py-4 rounded-2xl cursor-pointer hover:bg-neutral-900  2xl:m-5  2xl:py-5"

    if(hideFromMenu)
        return <></>


    return (
        <Dialog>
            <DialogTrigger asChild>

            <div className={showLuchMenuIndicator ? classNameWithBorder : classNameWithoutBorder}>
                {
                    showLuchMenuIndicator && (
                        <div className="absolute top-0 right-0 ">
                            <p className={comfortaa.className + " py-1 px-2 bg-[#FACE8D] rounded -translate-y-1/2 -translate-x-1/4 text-xs 2xl:text-base 2xl:px-4"}>Dagens lunch</p>
                        </div>
                    )
                }
                <div className="flex items-center mx-3 2xl:mx-5">
                    <div className="relative w-16 h-16 min-w-16 rounded-xl overflow-hidden 2xl:w-20 2xl:h-20 2xl:min-w-20">
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
                                    src='/food-ill.avif'
                                    alt="image of thailand food"
                                    className="w-full h-full"
                                />
                            )
                        }
                    </div>
                    <div className="text-white flex-grow pl-4 overflow-hidden">
                        <div className=" flex justify-between content-between text-lg mb-2">
                            <h3 className={comfortaa.className + ' text-sm scale-110 origin-left md:text-base md:scale-125'}>{title}</h3>
                            <div className="flex">
                                <p className={comfortaa.className + ' opacity-40 line-through mr-2 text-sm md:text-base'}>{prevPrice}</p>
                                <p className={comfortaa.className + ' text-sm md:text-base'}>{currentPrice}</p>
                            </div>
                        </div>
                        <p  className={comfortaa.className + " opacity-65 text-nowrap overflow-hidden text-ellipsis mr-8 text-sm md:text-base"}>{ingredients}</p>
                        <p  className={comfortaa.className + " opacity-65 text-nowrap overflow-hidden text-ellipsis mr-8 text-sm md:text-base"}>{priceDescription}</p>
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


function MenuSection({sectionData, showTodayLunchIndicator}){
    const sectionTitle = sectionData.title
    const dishesData = sectionData.dishes

    return (
        <div className="w-full mb-20 mt-20">
            <section className="max-w-4xl m-auto">
                <h2 className={dancingScript.className + ' text-[#FACE8D] text-3xl mb-4 ml-6 2xl:ml-11'}>{sectionTitle}</h2>
                <div>
                    {
                        dishesData.map(dishData => <MenuItem dishData={dishData} key={dishData.id} showTodayLunchIndicator={showTodayLunchIndicator}/>)
                    }
                </div>
            </section>
        </div>
    )
}

export default function MenuComponent({menuData}) {
    const menuSections = menuData.sections
    return (
        <div className="w-screen bg-[#050505] flex flex-col 2xl:flex-row">
            <div className="h-[40lvh] overflow-hidden sticky top-0 left-0 2xl:h-screen 2xl:w-1/2">
                <div className="w-full h-full bg-black opacity-20 absolute z-40"></div>
                <div className="relative w-full h-full z-50 flex justify-center items-center">
                    <div>
                        <h1 className={dancingScript.className + ' text-[#FACE8D] text-center text-4xl md:text-5xl'}>{menuData.menuTopText}</h1>
                        <h2 className={comfortaa.className + ' text-white text-center text-5xl md:text-6xl'}>{menuData.menuTitle}</h2>
                    </div>
                </div>
                <div className="w-full absolute top-0 left-0 z-50 p-2 md:p-5">
                    <Link href="/home"><p className={comfortaa.className + ' text-white text-lg text-center md:text-xl'}>Thongwiset.</p></Link>
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

            <div className="h-2/3 overflow-scroll relative bg-black 2xl:h-screen noScrollBar">
                <div className="overflow-hidden sticky top-0 right-0 bg-black z-50">
                    <div className="flex justify-center py-6 max-w-4xl m-auto">
                    {
                        menuData.banner 
                        ? <span className={comfortaa.className + ' text-white mx-4 text-nowrap'}>{menuData.banner}</span>
                        : menuSections.map(sectionData => <span className={comfortaa.className + ' text-white mx-4 text-nowrap'} key={sectionData.id}>{sectionData.title}</span> )
                    } 
                    </div>
                </div>
                {
                    menuSections.map(sectionData => <MenuSection sectionData={sectionData} key={sectionData.id} showTodayLunchIndicator={menuData.showTodayLunchIndicator}/> )
                }
                <AddMenuSectionButton menuSections={menuSections} avalableCategories={menuSections.map(section => section.title)}/>
                <Footer />
            </div>
        </div>
    )
}

function Footer(){
    return (
        <div className="mx-6 2xl:mx-11 mb-20 flex flex-col opacity-65 border-t-2 mt-40 text-sm">
            <div className="flex justify-end mt-4 items-center">
                <Link href='https://www.google.com/maps/place/Thongwiset/@59.3170927,18.0467831,17z/data=!3m1!4b1!4m6!3m5!1s0x465f77c2aafc4e9f:0x615b729446ab0e85!8m2!3d59.31709!4d18.049358!16s%2Fg%2F1hc1ykkn5?hl=sv&entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D'>
                    <span className="text-white pr-2 underline">Hornsgatan 85, T-Bana Zinkensdamm</span>
                </Link>
                <MapPinHouseIcon color="white" strokeWidth={1.5}></MapPinHouseIcon>
            </div>
            <div className="flex justify-end mt-4 items-center">
                <a href="tel:086691800" className="text-white pr-2 underline">08-669 18 00</a>
                <Phone color="white" strokeWidth={1.5}></Phone>
            </div>
            <div className="flex justify-end mt-4 items-center">
                <Link href='#' className="text-white pr-2 underline">Öppetider</Link>
                <Clock color="white" strokeWidth={1.5}></Clock>
            </div>
            <div className="flex justify-end mt-4 items-center">
                <Link href='https://www.facebook.com/people/Thongwiset-thai/100049786184279/?hc_location=ufi#'>
                    <svg role="img" className="fill-white w-7 h-7"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>
                </Link>
                <Link href='https://www.instagram.com/thongwisetrestaurang/'>
                    <svg role="img" className="fill-white w-7 h-7 ml-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>
                </Link>
                <Link href='https://www.tripadvisor.se/Restaurant_Review-g189852-d6787631-Reviews-Thongwiset-Stockholm.html'>
                    <TripadvisorIcon className='fill-white w-8 h-8 ml-4'/>
                </Link>
            </div>
            <div className="flex justify-center mt-10 items-end text-white fill-white flex-col">
                <span>Thongwiset.</span>
                <span className="flex justify-center items-center">Copyright 2025 <Copyright strokeWidth={1.5} className="ml-0.5" size={20}/></span>
            </div>

        </div>
    )
}