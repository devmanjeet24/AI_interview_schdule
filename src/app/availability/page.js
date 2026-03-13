"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import DashboardLayout from "@/components/DashboardLayout"
import { Clock } from "@phosphor-icons/react"

export default function Availability() {

 const [slots, setSlots] = useState([])

 useEffect(() => {
  fetchSlots()
 }, [])

 const fetchSlots = async () => {
  const res = await api.get("/availability")
  setSlots(res.data.slots)
 }

 const formatDate = (dateString) => {
  const date = new Date(dateString)

  return date.toLocaleString("en-US", {
   month: "short",
   day: "numeric",
   year: "numeric",
   hour: "2-digit",
   minute: "2-digit"
  })
 }

 return (

  <DashboardLayout>

   <div className="space-y-8">

    {/* Header */}

    <div className="flex items-center justify-between">

     <div>
      <h1 className="text-3xl font-semibold text-white">
       Availability
      </h1>

      <p className="text-gray-400 text-sm mt-1">
       Your available interview time slots
      </p>
     </div>

    </div>


    {/* Slots */}

    <div className="grid gap-4">

     {slots.length === 0 && (
      <div className="bg-white/5 border border-white/10 rounded-xl p-10 text-center">

       <div className="flex justify-center mb-3">
        <Clock size={32} className="text-gray-400" />
       </div>

       <p className="text-gray-400">
        No availability slots yet
       </p>

      </div>
     )}

     {slots.map((s, i) => (

      <div
       key={i}
       className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5 flex items-center justify-between transition hover:bg-white/10 hover:scale-[1.01]"
      >

       {/* Date */}

       <div className="flex items-center gap-3">

        <div className="p-2 rounded-lg bg-indigo-500/10">
         <Clock size={20} className="text-indigo-400"/>
        </div>

        <div className="text-gray-200 font-medium">
         {formatDate(s)}
        </div>

       </div>


       {/* Status */}

       <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full">
        Available
       </span>

      </div>

     ))}

    </div>

   </div>

  </DashboardLayout>

 )

}