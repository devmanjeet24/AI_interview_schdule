"use client"

import {useState} from "react"
import api from "@/lib/api"

export default function Chat(){

 const [message,setMessage] = useState("")
 const [response,setResponse] = useState("")

 const sendMessage = async()=>{

  const res = await api.post("/chat",{message})

  setResponse(JSON.stringify(res.data,null,2))

 }

 return(

  <div className="p-6">

   <h1 className="text-xl font-bold mb-4">
   AI Chat
   </h1>

   <input
    value={message}
    onChange={(e)=>setMessage(e.target.value)}
    className="border p-2 w-full"
   />

   <button
    onClick={sendMessage}
    className="bg-blue-600 text-white p-2 mt-2"
   >
    Send
   </button>

   <pre className="mt-4 bg-gray-100 p-3">
    {response}
   </pre>

  </div>

 )

}