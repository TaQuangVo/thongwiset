function extractTodayMenu(menu){
    let todayMenu = {
        menuTopText: 'Titta på vår',
        menuTitle: 'Lunch meny',
        banner: 'Välcommen till Thongweset, Vi önskar dig en smaklig måltid hos oss.',
        showTodayLunchIndicator: false,
        sections: []
    };
    
    const weekdays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
    
    let index = 1;
    weekdays.forEach(weekday => {
        let section = {
            id: index,
            title: weekday,
            dishes: getDishesForWeekDay(menu, weekday),
        }
        if(section.dishes.length != 0){
            todayMenu.sections.push(section);
            index ++;
        }
    });

    return todayMenu;
}

function getDishesForWeekDay(menu, weekday){
    let dishes = [];
    menu.sections.forEach(section => {
        section.dishes.forEach(dish => {
            if(dish.lunchMenuDate == weekday && dish.inLunchMenu){
                dishes.push(dish);
            }
        });
    });
    return dishes
}

function getNextWeekdayDate(weekday) {
    const weekdays = {
        "Måndag": 1,
        "Tisdag": 2,
        "Onsdag": 3,
        "Torsdag": 4,
        "Fredag": 5,
        "Lördag": 6,
        "Söndag": 0
    };

    if (!(weekday in weekdays)) {
        throw new Error("Invalid weekday name");
    }

    const today = new Date();
    const targetDay = weekdays[weekday];

    let expDate = new Date(today);
    expDate.setDate(today.getDate() + ((targetDay + 7 - today.getDay()) % 7 || 7));

    return expDate;
}

function calcIsInLunchMenu(inLunchMenu, lunchMenuDate){
    let today = Date.now();
    if(!inLunchMenu || lunchMenuDate == null || today > lunchMenuDate){
        return {
            inLunchMenu: false,
            lunchMenuDate: null,
        }
    }
    return {
        inLunchMenu: true,
        lunchMenuDate: lunchMenuDate,
    }
}

export {extractTodayMenu, getNextWeekdayDate, calcIsInLunchMenu}