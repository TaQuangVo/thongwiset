import Link from 'next/link'
import { Button } from "@/components/ui/roundButton"
import SignOutButton from "@/components/SignOutButtom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import MenuIcon from "./MenuIcon"
import ClockIcon from "./ClockIcon"
import FoodBowlIcon from "./FoodBowlIcon"
import CarrotIcon from "./CarrotIcon"
import InfoCloudIcon from "./InfoCloudIcon"
import CalenderPlusIcon from "./CalenderPlusIcon"
import BagIcon from "./BagIcon"
import UberIcon from "./UberIcon"
import NavigationHouse from "./NavigationHouse"
import StoreIcon from "./StoreIcon"
import { ExternalLink, House, PhoneCall } from 'lucide-react'
  


export default function MenuActionButton(){
    return (
        <div className="flex justify-center items-center p-10">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button  variant="secondary">
                        <MenuIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>    
                    <DropdownMenuLabel>
                        Hej och välkomna!
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href='/home'>
                        <DropdownMenuItem>
                            <House/>
                                Start
                            </DropdownMenuItem>
                    </Link>
                    <Link href='/menu'>
                        <DropdownMenuItem>
                            <FoodBowlIcon />
                                À la carte
                            </DropdownMenuItem>
                    </Link>
                    <Link href='/menu/today'>
                        <DropdownMenuItem>
                            <CarrotIcon />
                                Veckans lunch
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <InfoCloudIcon />
                            <span>Info</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <Link href='/home/adress'>
                                    <DropdownMenuItem>
                                        <NavigationHouse />
                                        <span>Adress</span>
                                    </DropdownMenuItem>
                                </Link>
                                <Link href='/home/openhours'>
                                    <DropdownMenuItem>
                                        <ClockIcon />
                                        <span>Öppettider</span>
                                    </DropdownMenuItem>
                                </Link>
                                <Link href='/home/contact'>
                                    <DropdownMenuItem>
                                    <PhoneCall />
                                        <span>Contact</span>
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <CalenderPlusIcon />
                            <span>Boka</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <Link href='https://qopla.com/restaurant/thongwiset/q28W1aqoB3/order'>
                                    <DropdownMenuItem>
                                        <BagIcon />
                                        <span className='flex items-center'>
                                            Avhämtning 
                                            <ExternalLink size={12} className="ml-1"/>
                                        </span>
                                    </DropdownMenuItem>
                                </Link>
                                <Link href='https://www.ubereats.com/se-en/store/thongwiset-thai/i58g_zymRZCkJ3GKje1TlA'>
                                    <DropdownMenuItem>
                                        <UberIcon />
                                        <span className='flex items-center'>
                                            Uber Eat
                                            <ExternalLink size={12} className="ml-1"/>
                                        </span>
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <SignOutButton>
                        <DropdownMenuItem>
                            <CarrotIcon />
                            Log ut
                        </DropdownMenuItem>
                    </SignOutButton>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}