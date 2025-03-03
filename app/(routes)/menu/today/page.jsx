import {menuDataMock} from '@/constant/dataMock.js'
import MenuComponent from '@/components/MenuComponent'
import { fetchLunchMenuData,getAllDishes } from './../../../actions/menu'

export default async function Menu(){
    const allDishes = await getAllDishes();
    const data = await fetchLunchMenuData();

    const menuDate = {
        menuTopText: 'Titta på vår',
        menuTitle: 'Lunch Menu',
        banner: 'Välcommen till Thongweset, Vi önskar dig en smaklig måltid hos oss.',
        showTodayLunchIndicator: true,
        sections: data,
    }
    return (
        <MenuComponent menuData={menuDate} allDishes={allDishes} isLunchMenu={true}/>
    )
}
