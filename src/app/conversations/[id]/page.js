"use client"

import {useEffect,useState} from "react"
import api from "@/lib/api"
import {useParams} from "next/navigation"
import DashboardLayout from "@/components/DashboardLayout"

export default function ConversationHistory(){

 const {id} = useParams()

 const [history,setHistory] = useState([])

 useEffect(()=>{

  fetchHistory()

 },[])

 const fetchHistory = async()=>{

  const res = await api.get(`/conversation/${id}`)

  setHistory(res.data.history)

 }

 return(

  <DashboardLayout>

   <div className="max-w-3xl mx-auto space-y-4">

    <h1 className="text-2xl font-bold">
     Conversation History
    </h1>

    {history.map((msg,i)=>{

     const isUser = msg.role === "user"

     return(

      <div
       key={i}
       className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      >

       <div
        className={`p-3 rounded-lg max-w-xs ${
         isUser
          ? "bg-black text-white"
          : "bg-gray-100"
        }`}
       >

        {msg.message}

       </div>

      </div>

     )

    })}

   </div>

  </DashboardLayout>

 )

}