import Image from "next/image"
import {Dancing_Script, Comfortaa} from "next/font/google"
import MenuActionButton from "@/components/MenuActionButton"
import Link from 'next/link'
import { ExternalLink } from "lucide-react"


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
                    <h1 className={dancingScript.className + ' text-[#FACE8D] text-center text-3xl md:text-4xl'}>Vår adress</h1>
                    <h2 className={comfortaa.className + ' text-white text-center text-5xl md:text-6xl mt-5'}>Zinkensdamm</h2>
                    <div className='max-w-[80sw]'>
                        <h2 className={comfortaa.className + ' text-white text-center text-base md:text-2xl mt-5 mb-3'}>Hornsgatan 85, Stockholm.</h2>
                        <Link href='https://www.google.com/maps/place/Thongwiset/@59.3170927,18.0467831,17z/data=!3m1!4b1!4m6!3m5!1s0x465f77c2aafc4e9f:0x615b729446ab0e85!8m2!3d59.31709!4d18.049358!16s%2Fg%2F1hc1ykkn5?hl=sv&entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D' 
                            className={comfortaa.className + ' text-white text-center text-base md:text-2xl underline flex justify-center items-center'}>
                                Visa i kortan 
                                <ExternalLink size={16} className="ml-1"/>
                        </Link>
                    </div>
                </div>
    )
}