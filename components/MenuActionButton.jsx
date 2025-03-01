import Link from 'next/link'
import { Button } from "@/components/ui/roundButton"
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
                    <DropdownMenuItem>
                        <FoodBowlIcon />
                        <Link href='/menu'>
                            À la carte
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CarrotIcon />
                        <Link href='/menu/today'>
                            Veckans lunch
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <InfoCloudIcon />
                            <span>Info</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <NavigationHouse />
                                    <span>Address</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                   <ClockIcon />
                                    <span>Öppettider</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <StoreIcon />
                                    <span>Om oss</span>
                                </DropdownMenuItem>
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
                                <DropdownMenuItem>
                                   <BagIcon />
                                    <span>Avhämtning</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                   <UberIcon />
                                    <span>Uber Eat</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}