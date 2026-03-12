"use client"

import {useEffect,useState} from "react"
import api from "@/lib/api"

export default function Availability(){

 const [slots,setSlots] = useState([])

 useEffect(()=>{

  fetchSlots()

 },[])

 const fetchSlots = async()=>{

  const res = await api.get("/availability")

  setSlots(res.data.slots)

 }

 return(

  <div className="p-6">

   <h1 className="text-xl font-bold mb-4">
   Available Slots
   </h1>

   {slots.map((s,i)=>(
    <div key={i} className="border p-2 mb-2">
     {s}
    </div>
   ))}

  </div>

 )

}