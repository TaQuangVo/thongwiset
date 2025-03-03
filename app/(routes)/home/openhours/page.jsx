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


export default function Home() {
    return (
                        <div>
                    <h1 className={dancingScript.className + ' text-[#FACE8D] text-center text-3xl md:text-4xl'}>Våra öppettider</h1>
                    <h2 className={comfortaa.className + ' text-white text-center text-5xl md:text-6xl mt-5'}>11:00-21:00</h2>
                    <div className='max-w-[80sw]'>
                        <h2 className={comfortaa.className + ' text-white text-center text-base md:text-2xl mt-5'}>Vi har öpet från 11:00 till 21:00 alla dagar. 
                            <br/>(Obs, lunchstängt 14:30 - 15:30 på vardagar)
                            <br/>Varmt välcomen</h2>
                    </div>
                </div>
    )
}