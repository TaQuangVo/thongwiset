'use server'

import { unstable_cacheTag as cacheTag } from 'next/cache';
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/authOption';
import { calcIsInLunchMenu, isTodayLuchMenu, calcMenuDate, extractLunchMenuData } from '@/lib/menuUtils'

async function getAllUpcomingLunchMenu() {
    'use cache'
    cacheTag('lunchMenuData')
    const client = new MongoClient(process.env.MONGODB_URI);
  
    try {
      await client.connect();
      const database = client.db("restaurant");
      const collection = database.collection("lunchMenuList");
  
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
      const lunchMenu = await collection.find({
        date: { $gte: startOfToday }
      }).sort({ date: 1 }).toArray();
  
      const lunchMenuList = lunchMenu.map(item => ({
        ...item,
        _id: item._id.toString(),
        id: item._id.toString()
      }));
  
      return lunchMenuList;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }

async function getAllDishes(){
    'use cache'
    cacheTag('menuData')
    const client = new MongoClient(process.env.MONGODB_URI, {
    });

    try {
        await client.connect();

        const database = client.db("restaurant");

        const collection = database.collection("menu");
        const allDishRaw = await collection.find({}).sort({ categoryName: 1 }).toArray();

        let disheshProcessed = []

        allDishRaw.forEach(data => {
            let temp = {...data, _id: data._id.toString(), id: data._id.toString()}
            //temp.inLunchMenu = calcIsInLunchMenu(temp.inLunchMenu, temp.lunchMenuDate)
            //temp.isInTodayLunchMenu = isTodayLuchMenu(temp.inLunchMenu, temp.lunchMenuDate)
            //temp.lunchMenuDateReadable = calcMenuDate(temp.inLunchMenu, temp.lunchMenuDate)

            disheshProcessed.push(temp)
        })

        return disheshProcessed
        //return Response.json({data: formatedData}, {status: 200})
    } catch (error) {
        throw error
    } finally {
        await client.close();
    }
}

async function getUpcomingLunchMenu() {
    const client = new MongoClient(process.env.MONGODB_URI);
  
    try {
      let lunchMenu = await getAllUpcomingLunchMenu()
      lunchMenu = lunchMenu.filter(i => isTodayOrFuture(i.date))
  
      const lunchMenuList = lunchMenu.map(item => ({
        ...item,
        _id: item._id.toString(),
        id: item._id.toString()
      }));
  
      return lunchMenuList;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }


  function isTodayOrFuture(dateInput) {
    // Convert the input to a Date if it isn't already.
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    
    // Get today's date at midnight.
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Check if the date is equal to or after the start of today.
    return date >= todayStart;
  }


  async function getTodaysLunchMenu() {
    const client = new MongoClient(process.env.MONGODB_URI);
  
    try {
      let lunchMenu = await getAllUpcomingLunchMenu()
      lunchMenu = lunchMenu.filter(i => isToday(i.date))
  
      // Convert MongoDB ObjectIds to strings.
      const lunchMenuList = lunchMenu.map(data => ({
        ...data,
        _id: data._id.toString(),
        id: data._id.toString()
      }));
  
      return lunchMenuList;
    } catch (error) {
      throw error;
    } finally {
      await client.close();
    }
  }


async function startOver(){
    const client = new MongoClient(process.env.MONGODB_URI, {
    });

    try {
        await client.connect();

        const database = client.db("restaurant");

        const collection = database.collection("menu");
        const result = await collection.deleteMany({});
        
        //return Response.json({data: formatedData}, {status: 200})
    } catch (error) {
        throw error
    } finally {
        await client.close();
    }
}


async function fetchLunchMenuData (){
    try {
        const allData = await getAllDishes();
        const idDishMapping = allData.reduce((acc, dish) => {
            acc[dish.id] = dish;
            return acc;
          }, {});

        const upcommingLunchData = await getUpcomingLunchMenu();

        let lunchMenuData = []

        upcommingLunchData.forEach(menuData => {
            const dishId = menuData.dishId;
            const lunchDate = menuData.date
            const dish = idDishMapping[dishId]
            let temp = {...dish}
            temp['inLunchMenu'] = true
            temp['lunchMenuDate'] = lunchDate
            temp['isInTodayLunchMenu'] = isTodayLuchMenu(true, temp.lunchMenuDate)
            temp['lunchMenuDateReadable'] = calcMenuDate(true, temp.lunchMenuDate)
            temp['lunchMenuId'] = menuData._id.toString()

            lunchMenuData.push(temp)
        })

        return extractLunchMenuData(lunchMenuData)
    } catch (error) {
        return error.message 
    }
} 

function isToday(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    );
  }

async function fetchMenuData (){

    try {
        const allData = await getAllDishes();


        let todayLuncMenu = await getTodaysLunchMenu();

        const idLunchDishMapping = todayLuncMenu.reduce((acc, dish) => {
            acc[dish.dishId] = dish;
            return acc;
        }, {});

        let lunchMenuData = []

        allData.forEach(menuData => {
            const dishId = menuData.id
            let temp = {...menuData}

            if(idLunchDishMapping[dishId] == null){
                temp['inLunchMenu'] = false
                lunchMenuData.push(temp)
                return
            }
            const lunchMenuDate = idLunchDishMapping[dishId].date
            const id = idLunchDishMapping[dishId]._id.toString()

            temp['inLunchMenu'] = true
            temp['lunchMenuDate'] = lunchMenuDate
            temp['isInTodayLunchMenu'] = isTodayLuchMenu(true, lunchMenuDate)
            temp['lunchMenuDateReadable'] = calcMenuDate(true, lunchMenuDate)
            temp['lunchMenuId'] = id
            lunchMenuData.push(temp)
        })

        let formatedData = []

        let categoryName = ''
        let currentSection = null

        lunchMenuData.forEach(data => {
            if(categoryName != data.categoryName){
                categoryName = data.categoryName
                if(currentSection != null){
                    formatedData.push(currentSection)
                }
                currentSection = {
                    id: data.categoryName,
                    title: data.categoryName,
                    dishes: [],
                }
            }
            currentSection.dishes.push(data)
        })

        if(currentSection != null)
            formatedData.push(currentSection)

        return formatedData
    } catch (error) {
        return error.message 
    }
} 

export {fetchMenuData, fetchLunchMenuData, getAllDishes}