import {menuDataMock} from '@/constant/dataMock.js'
import MenuComponent from '@/components/MenuComponent'
import { extractTodayMenu } from '@/lib/menuUtils'

export default function Menu(){
    const menu = extractTodayMenu(menuDataMock);
    return (
        <MenuComponent menuData={menu} />
    )
}
