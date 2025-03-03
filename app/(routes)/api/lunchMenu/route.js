import { MongoClient, ObjectId } from 'mongodb';
import { revalidateTag } from "next/cache";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOption';


export async function POST (req){
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const data = await req.formData()

    const client = new MongoClient(process.env.MONGODB_URI, {
    });

    const luchMenuItem = new Map()
    for (const pair of data.entries()) {
        if(pair[0] == 'id'){
            continue
        }
        if(pair[0] == 'date'){
            luchMenuItem.set(pair[0], new Date(pair[1]));
            continue
        }
        luchMenuItem.set(pair[0], pair[1]);
    }

    try {
        await client.connect();

        const database = client.db("restaurant");

        const collection = database.collection("lunchMenuList");
        const result = await collection.insertOne(Object.fromEntries(luchMenuItem));
        luchMenuItem.set("id", result.insertedId.toString());

        revalidateTag('lunchMenuData')
        return Response.json({messages:'Data saved successfully!', data:luchMenuItem}, {status: 201})
    } catch (error) {
        return Response.json('Something went wrong!, ' + error, {status: 500})
    } finally {
        await client.close();
    }
}

export async function PATCH (req){
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const data = await req.formData()

    const id = data.get('id');
    if (!id || id === '') {
      return Response.json('Id is required for PATCH operations.', { status: 400 });
    }

    const client = new MongoClient(process.env.MONGODB_URI, {
    });

    const luchMenuItem = new Map()
    for (const pair of data.entries()) {
        if(pair[0] == 'id'){
            continue
        }
        if(pair[0] == 'date'){
            luchMenuItem.set(pair[0], new Date(pair[1]));
            continue
        }
        luchMenuItem.set(pair[0], pair[1]);
    }

    luchMenuItem.delete('id');
  // Convert the Map to a plain object.
  const updateData = Object.fromEntries(luchMenuItem);

  try {
    await client.connect();
    const database = client.db("restaurant");
    const collection = database.collection("lunchMenuList");

    // Perform the update using updateOne and the $set operator.
    const result = await collection.updateOne(
      { _id: new ObjectId(String(id)) },
      { $set: updateData }
    );

    // Optionally revalidate your cache if needed.
    revalidateTag('lunchMenuData');

    return Response.json(
      { messages: 'Data updated successfully!', data: updateData, result },
      { status: 200 }
    );
  } catch (error) {
    return Response.json('Something went wrong!, ' + error, { status: 500 });
  } finally {
    await client.close();
  }
} 

export async function DELETE(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    // Parse the FormData from the request.
    const data = await req.formData();
    const id = data.get('id');
    
    if (!id || id === '') {
      return Response.json('Id is required for DELETE operations.', { status: 400 });
    }

    const menu = new Map()
    for (const pair of data.entries()) {
        menu.set(pair[0], pair[1]);
    }
  
    const client = new MongoClient(process.env.MONGODB_URI);
    
    try {
      await client.connect();
      const database = client.db("restaurant");
      const collection = database.collection("lunchMenuList");
      
      // Delete the document by _id.
      const result = await collection.deleteOne({ _id: new ObjectId(String(id)) });
      
      if (result.deletedCount === 0) {
        return Response.json('No document found with the provided id.', { status: 404 });
      }
      
      // Revalidate the cache tag for menu data if using ISR.
      revalidateTag('lunchMenuData');
  
      return Response.json(
        { message: 'Document deleted successfully.', data:menu },
        { status: 200 }
      );
    } catch (error) {
      return Response.json('Something went wrong!, ' + error, { status: 500 });
    } finally {
      await client.close();
    }
  }