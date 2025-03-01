"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import ImgUploader from "@/components/ImgUploader"


function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}


export default function Home() {
  const [allData, setAllData] = useState([]);

  const fetchAllData = async () => {
    const response = await fetch("/api/getAllData");

    if (response.ok) {
        console.log('hello')
        const data = await response.json();
        console.log('olka')
        console.log(data)
        setAllData(data);
    } else {
        alert("Failed to fetch data!");
    }
  };

  const handleSaveData = async () => {
    let inputData = {
      title: 'namtock'
    }

    const response = await fetch("/api/getAllData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: inputData }),
    });

    if (response.ok) {
        alert("Data saved successfully!");
    } else {
        alert("Something went wrong!");
    }
  };

  return (
    <div>
      <Component ></Component>
      <button onClick={fetchAllData}>get</button>
      <button onClick={handleSaveData}>post</button>
      <string>{JSON.stringify(allData)}</string>
      <ImgUploader ></ImgUploader>
    </div>
  );
}
