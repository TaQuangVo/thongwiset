'use server'
import {menuDataMock} from '@/constant/dataMock.js'
import MenuComponent from '@/components/MenuComponent'
import { fetchMenuData, getAllDishes } from './../../actions/menu'


export default async function Menu(){

    const allDishes = await getAllDishes();
    const data = await fetchMenuData();

    const menuDate = {
        menuTopText: 'Titta på',
        menuTitle: 'Vår Menu',
        banner: 'Välcommen till Thongweset, Vi önskar dig en smaklig måltid hos oss.',
        showTodayLunchIndicator: true,
        sections: data,
    }

    
    return (
        <MenuComponent menuData={menuDate} allDishes={allDishes} isLunchMenu={false}/>
    )
}
