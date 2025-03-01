import Image from "next/image"
import {Dancing_Script, Comfortaa} from "next/font/google"
import MenuActionButton from "@/components/MenuActionButton"


const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weights: [400]
})

const comfortaa = Comfortaa({
    subsets: ["latin"],
    weights: ["800"]
})


export default function Home() {
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
            <div className="w-full h-full bg-black opacity-20 absolute z-40"></div>
            <div className="w-full absolute p-3 z-50 2xl:p-11">
                <p className={comfortaa.className + ' text-white text-xl text-center 2xl:text-2xl'}>Thongwiset.</p>
            </div>
            <div className="relative w-full h-full z-50 flex justify-center items-center">
                <div>
                    <h1 className={dancingScript.className + ' text-[#FACE8D] text-center text-3xl md:text-4xl'}>The pure tase of</h1>
                    <h2 className={comfortaa.className + ' text-white text-center text-5xl md:text-6xl mt-5'}>Thailand</h2>
                </div>
            </div>
            <div className="absolute z-50 bottom-0 left-0 w-full">
                <MenuActionButton></MenuActionButton>
            </div>
        </div>
    )
}