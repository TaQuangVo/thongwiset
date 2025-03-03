import Image from "next/image"
import {Dancing_Script, Comfortaa} from "next/font/google"
import MenuActionButton from "@/components/MenuActionButton"
import Link from 'next/link'


const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weights: [400],
    display: "swap",
    adjustFontFallback: false
})

const comfortaa = Comfortaa({
    subsets: ["latin"],
    weights: ["800"],
    display: "swap",
    adjustFontFallback: false,
})


export default function HomeLayout({ children }) {
    return (
        <div className="relative h-svh overflow-hidden">
            <div className="w-[3000px] h-lvh bg-black absolute top-0 left-1/2 -translate-x-1/2">
                <Image 
                    src='/hero-image.jpg' 
                    alt="image of thailand food"
                    width={2167}
                    height={1061}
                    style={{height: "100%", width: "3000px", objectFit: "contain"}}
                    />
            </div>
            <div className="w-full h-full bg-black opacity-40 absolute z-40"></div>
            <div className="w-full absolute p-3 z-50 2xl:p-11">
                <Link href="/home">
                    <p className={comfortaa.className + ' text-white text-xl text-center 2xl:text-2xl'}>Thongwiset.</p>
                </Link>
            </div>
            <div className="relative w-full h-full z-40 flex justify-center items-center">
                <div>
                    {children}
                </div>
            </div>
            <div className="absolute z-50 bottom-0 left-0 w-full">
                <MenuActionButton></MenuActionButton>
            </div>
        </div>
    )
}