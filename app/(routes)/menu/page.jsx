import {menuDataMock} from '@/constant/dataMock.js'
import MenuComponent from '@/components/MenuComponent'

export default function Menu(){
    return (
        <MenuComponent menuData={menuDataMock} />
    )
}
