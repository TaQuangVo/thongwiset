import Image from "next/image"
import {Dancing_Script, Comfortaa} from "next/font/google"
import MenuActionButton from "@/components/MenuActionButton"


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
                    <h1 className={dancingScript.className + ' text-[#FACE8D] text-center text-3xl md:text-4xl'}>The pure tase of</h1>
                    <h2 className={comfortaa.className + ' text-white text-center text-5xl md:text-6xl mt-5'}>Thailand</h2>
                </div>

    )
}