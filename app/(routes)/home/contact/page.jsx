import Image from "next/image"
import {Dancing_Script, Comfortaa} from "next/font/google"
import Link from 'next/link'
import { PhoneCall } from "lucide-react"


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
                    <h1 className={dancingScript.className + ' text-[#FACE8D] text-center text-3xl md:text-4xl'}>Contacta oss</h1>
                    <h2 className={comfortaa.className + ' text-white text-center text-5xl md:text-6xl mt-5'}>08-669-1800</h2>
                    <div className='max-w-[80sw]'>
                        <h2 className={comfortaa.className + ' text-white text-center text-base md:text-2xl mt-5 mb-3'}>Vi tar emot order och avhämtning via telefon.</h2>
                        <Link href="tel:086691800"
                            className={comfortaa.className + ' text-white text-center text-base md:text-2xl underline flex justify-center items-center'}>
                                Ring oss
                                <PhoneCall color="#ffffff"  size={14} className="ml-1"/>
                        </Link>
                    </div>
                </div>

    )
}