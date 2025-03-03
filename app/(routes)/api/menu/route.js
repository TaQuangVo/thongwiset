import { MongoClient, ObjectId } from 'mongodb';
import { put } from "@vercel/blob";
import { revalidateTag } from "next/cache";
import {DEFAULT_IMAGE_URL} from './../../../../constant/const'
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

    let finalImageUrl = DEFAULT_IMAGE_URL
    if(data.get('imageUrl')){
        const timeStamp = Date();
        const fileName = timeStamp + data.get('imageUrl').name
        const { url } = await put(fileName, data.get('imageUrl'), { access: 'public' });
        if(url){
            finalImageUrl = url;
        }
    }else{
        data.set('imageUrl', '');
    }

    const menu = new Map()
    for (const pair of data.entries()) {
        if(pair[0] == 'id'){
            continue
        }
        if(pair[0] == 'imageUrl'){
            menu.set(pair[0], finalImageUrl);
            continue
        }
        if(pair[1] == 'true'){
            menu.set(pair[0], true);
            continue
        }else if(pair[1] == 'false'){
            menu.set(pair[0], false);
            continue
        }
        menu.set(pair[0], pair[1]);
    }

    try {
        await client.connect();

        const database = client.db("restaurant");

        const collection = database.collection("menu");
        const result = await collection.insertOne(Object.fromEntries(menu));
        menu.set("id", result.insertedId.toString());

        revalidateTag('menuData')
        return Response.json({messages:'Data saved successfully!', data:menu}, {status: 201})
    } catch (error) {
        return Response.json('Something went wrong!, ' + error, {status: 500})
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
        if(pair[1] == 'true'){
            menu.set(pair[0], true);
            continue
        }else if(pair[1] == 'false'){
            menu.set(pair[0], false);
            continue
        }
        menu.set(pair[0], pair[1]);
    }
  
    const client = new MongoClient(process.env.MONGODB_URI);
    
    try {
      await client.connect();
      const database = client.db("restaurant");
      const collection = database.collection("menu");
      
      // Delete the document by _id.
      const result = await collection.deleteOne({ _id: new ObjectId(String(id)) });
      
      if (result.deletedCount === 0) {
        return Response.json('No document found with the provided id.', { status: 404 });
      }

      const lunchMenuCol = database.collection("lunchMenuList");
      await lunchMenuCol.deleteMany({ dishId: String(id) });
      
      // Revalidate the cache tag for menu data if using ISR.
      revalidateTag('menuData');
  
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

    let finalImageUrl = DEFAULT_IMAGE_URL
    const imgFile = data.get('imageUrl')
    if(imgFile && imgFile instanceof File){
        const timeStamp = Date();
        const fileName = timeStamp + data.get('imageUrl').name
        const { url } = await put(fileName, data.get('imageUrl'), { access: 'public' });
        if(url){
            finalImageUrl = url;
        }
        data.set('imageUrl', finalImageUrl)
    }else{
        data.set('imageUrl', imgFile && imgFile !== '' ? imgFile : finalImageUrl);
    }

    const menu = new Map()
    for (const pair of data.entries()) {
        if(pair[1] == 'true'){
            menu.set(pair[0], true);
            continue
        }else if(pair[1] == 'false'){
            menu.set(pair[0], false);
            continue
        }
        menu.set(pair[0], pair[1]);
    }

    menu.delete('id');

  // Convert the Map to a plain object.
  const updateData = Object.fromEntries(menu);

  try {
    await client.connect();
    const database = client.db("restaurant");
    const collection = database.collection("menu");

    // Perform the update using updateOne and the $set operator.
    const result = await collection.updateOne(
      { _id: new ObjectId(String(id)) },
      { $set: updateData }
    );

    // Optionally revalidate your cache if needed.
    revalidateTag('menuData');

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
