"use client"

import {useEffect,useState} from "react"
import api from "@/lib/api"
import {useParams} from "next/navigation"

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

  <div className="p-6">

   <h1 className="text-xl font-bold mb-4">
   Conversation {id}
   </h1>

   {history.map((msg,i)=>(

    <div key={i} className="border p-2 mb-2">

     <b>{msg.role}</b>

     <p>{msg.message}</p>

    </div>

   ))}

  </div>

 )

}