import { isToday, addDays, isSameWeek, addWeeks, format } from 'date-fns';


function extractLunchMenuData(allDishes){
    let todayMenu = {
        menuTopText: 'Titta på vår',
        menuTitle: 'Lunch meny',
        banner: 'Välcommen till Thongweset, Vi önskar dig en smaklig måltid hos oss.',
        showTodayLunchIndicator: false,
        sections: []
    };
    
    let menuLuchDateMap = new Map()
    allDishes.forEach(dish => {
        if(!dish.lunchMenuDateReadable || dish.lunchMenuDateReadable == ''){
          return
        }

        if(!menuLuchDateMap.get(dish.lunchMenuDateReadable)){
          menuLuchDateMap.set(dish.lunchMenuDateReadable, [])
        }

        let dishes = menuLuchDateMap.get(dish.lunchMenuDateReadable)
        dishes.push(dish)
        menuLuchDateMap.set(dish.lunchMenuDateReadable, dishes)
    })

    menuLuchDateMap.keys().forEach(key => {
        todayMenu.sections.push({
          id: key,
          title: key,
          dishes: menuLuchDateMap.get(key)
        })
    })

    return todayMenu.sections;
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


function calcIsInLunchMenu(currentInLunchMenu, lunchMenuDateStr) {
    // If it's not currently true, there's nothing to recalc.
    if (!currentInLunchMenu || !lunchMenuDateStr) {
      return false;
    }
  
    // Parse the lunchMenuDate from the string.
    const lunchDate = new Date(lunchMenuDateStr);
    const now = new Date();
  
    // For date-only comparison, strip off the time.
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lunchDay = new Date(lunchDate.getFullYear(), lunchDate.getMonth(), lunchDate.getDate());
  
    // If the lunch date is in the past, then it should no longer be inLunchMenu.
    if (lunchDay < today) {
      return false;
    }
  
    // Calculate the start and end of the current week.
    // Here, we assume the week starts on Sunday and ends on Saturday.
    const currentDay = today.getDay(); // 0 (Sun) to 6 (Sat)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
  
    // If the lunch date falls between today and the end of the week, return true.
    if (lunchDay >= today && lunchDay <= endOfWeek) {
      return true;
    }
  
    // Otherwise, mark it as not in the lunch menu.
    return false;
  }

  function isTodayLuchMenu(inLunchMenu, lunchMenuDate){
    if(!inLunchMenu || !lunchMenuDate)
        return false

    lunchMenuDate = new Date(lunchMenuDate).toLocaleDateString('sv-SE', { weekday: 'long' })
    lunchMenuDate = lunchMenuDate.charAt(0).toUpperCase() + lunchMenuDate.slice(1);

    const today = new Date();
    const swedishDayOfWeek = today.toLocaleDateString('sv-SE', { weekday: 'long' });
    const capitalizedDay = swedishDayOfWeek.charAt(0).toUpperCase() + swedishDayOfWeek.slice(1);

    return lunchMenuDate == capitalizedDay
  }

  function calcMenuDate(inLunchMenu, lunchDateInput) {
    if(!inLunchMenu || !lunchDateInput)
        return ''


    const lunchDate = typeof lunchDateInput === 'string'
      ? new Date(lunchDateInput)
      : lunchDateInput;
    const now = new Date();

    // If the lunch date is today, return "Idag" (today in Swedish)
    if (isToday(lunchDate)) {
      return "Idag";
    }
    // If the lunch date is tomorrow, then the day before it is today.
    if (isToday(addDays(lunchDate, -1))) {
      return "Imorgon";
    }

    let lunchMenuDate = new Date(lunchDateInput).toLocaleDateString('sv-SE', { weekday: 'long' })
    lunchMenuDate = lunchMenuDate.charAt(0).toUpperCase() + lunchMenuDate.slice(1);
  
    // Using Monday as the start of the week (weekStartsOn: 1)
    if (isSameWeek(lunchDate, now, { weekStartsOn: 1 })) {
      // If lunchDate is in the current week, return just the weekday.
      return lunchMenuDate; // e.g., "Monday"
    } else if (isSameWeek(lunchDate, addWeeks(now, 1), { weekStartsOn: 1 })) {
      // If lunchDate is in next week, return weekday plus day/month.
      return lunchMenuDate + ' ' + format(lunchDate, 'dd/MM'); // e.g., "Tuesday 07/03"
    } else {
      // For dates beyond next week, you can adjust the format if needed.
      return lunchMenuDate + ' ' + format(lunchDate, 'dd/MM'); // e.g., "Tuesday 07/03"
    }
  }

export {extractLunchMenuData, calcIsInLunchMenu, isTodayLuchMenu, calcMenuDate}