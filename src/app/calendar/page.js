"use client"

import {useEffect,useState} from "react"
import api from "@/lib/api"
import Loader from "@/components/Loader"

export default function Calendar(){

 const [events,setEvents] = useState([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  fetchEvents()

 },[])

 const fetchEvents = async()=>{

  const res = await api.get("/calendar")

  setEvents(res.data.events)

  setLoading(false)

 }

 const deleteEvent = async(id)=>{

  await api.delete(`/calendar/${id}`)

  fetchEvents()

 }

 if(loading) return <Loader/>

 return(

  <div className="p-6">

   <h1 className="text-xl font-bold mb-4">
   Calendar Events
   </h1>

   {events.map(e=>(

    <div key={e._id} className="border p-3 mb-2">

     <p>{e.time}</p>

     <button
      onClick={()=>deleteEvent(e._id)}
      className="bg-red-600 text-white px-2 py-1"
     >
      Delete
     </button>

    </div>

   ))}

  </div>

 )

}