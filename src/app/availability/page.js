"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import DashboardLayout from "@/components/DashboardLayout"

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

   <div className="space-y-6">

    {/* Header */}
    <div>
     <h1 className="text-2xl font-semibold text-gray-800">
      Availability
     </h1>

     <p className="text-gray-500 text-sm">
      Your available interview time slots
     </p>
    </div>

    {/* Slots */}
    <div className="grid gap-3">

     {slots.length === 0 && (
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500">
       No slots available
      </div>
     )}

     {slots.map((s, i) => (

      <div
       key={i}
       className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition"
      >

       <div className="text-gray-700 font-medium">
        {formatDate(s)}
       </div>

       <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
        Available
       </span>

      </div>

     ))}

    </div>

   </div>

  </DashboardLayout>

 )

}