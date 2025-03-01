import { MongoClient } from "mongodb";


export async function GET (req){
    const client = new MongoClient(process.env.MONGODB_URI, {
    });

    try {
        await client.connect();

        const database = client.db("restaurant");

        const collection = database.collection("menu");
        const allData = await collection.find({}).sort({ price: 1 }).toArray();

        let formatedData = []

        let sectionName = ''
        let currentSection = null

        allData.forEach(data => {
            if(sectionName != data.sectionName){
                sectionName = data.sectionName

                if(currentSection != null){
                    formatedData.push(currentSection)
                }

                currentSection = {
                    id: data.sectionName,
                    title: data.sectionName,
                    dishes: [],
                }
            }

            currentSection.dishes.push(data)
        })

        if(currentSection != null)
            formatedData.push(currentSection)

        return Response.json({data: formatedData}, {status: 200})
    } catch (error) {
        return Response.json('Something went wrong!, ' + error, {status: 500})
    } finally {
        await client.close();
    }
} 


export async function POST (req){
    const body = await req.json()
    console.log(body)
    return Response.json({messages:'Data saved successfully!'}, {status: 201})

    const client = new MongoClient(process.env.MONGODB_URI, {
    });

    try {
        await client.connect();

        const database = client.db("restaurant");

        const collection = database.collection("menu");
        await collection.insertOne(body.data);

        return Response.json({messages:'Data saved successfully!'}, {status: 201})
    } catch (error) {
        return Response.json('Something went wrong!, ' + error, {status: 500})
    } finally {
        await client.close();
    }
} 
