"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import DashboardLayout from "@/components/DashboardLayout"
import Link from "next/link"

export default function Conversations(){

 const [conversations,setConversations] = useState([])

 useEffect(()=>{
  fetchConversations()
 },[])

 const fetchConversations = async()=>{

  try{

   const res = await api.get("/conversation")

   console.log("API conversations:",res.data)

   setConversations(res.data.conversations || [])

  }catch(err){

   console.error("Fetch conversations error",err)

  }

 }

 return(

  <DashboardLayout>

   <div className="space-y-6">

    <h1 className="text-2xl font-bold">
     Conversations
    </h1>

    {conversations.length === 0 && (
     <p className="text-gray-500">
      No conversations yet.
     </p>
    )}

    <div className="grid gap-4">

     {conversations.map((conv)=>(
      <Link
       key={conv.id}
       href={`/conversations/${conv.id}`}
       className="border p-4 rounded hover:bg-gray-50"
      >

       <p className="font-medium">
        Conversation
       </p>

       <p className="text-sm text-gray-500">
        ID: {conv.id}
       </p>

       <p className="text-xs text-gray-400 mt-1">
        Messages: {conv.messages?.length || 0}
       </p>

      </Link>
     ))}

    </div>

   </div>

  </DashboardLayout>

 )

}