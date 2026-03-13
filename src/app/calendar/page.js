"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import Loader from "@/components/Loader"
import DashboardLayout from "@/components/DashboardLayout"

import {
 CalendarDays,
 Clock,
 User,
 Mail,
 Briefcase,
 Video
} from "lucide-react"

function formatDate(date){
 return new Date(date).toLocaleString("en-IN",{
  weekday:"short",
  day:"numeric",
  month:"short",
  year:"numeric",
  hour:"2-digit",
  minute:"2-digit"
 })
}

export default function Calendar(){

 const [events,setEvents] = useState([])
 const [loading,setLoading] = useState(true)

 const [rescheduleId,setRescheduleId] = useState(null)
 const [newTime,setNewTime] = useState("")

 useEffect(()=>{
  fetchEvents()
 },[])

 const fetchEvents = async()=>{
  try{
    console.log("TOKEN:", localStorage.getItem("accessToken")) 
   const res = await api.get("/calendar")
   setEvents(res.data.events || [])
  }catch(err){
   console.error(err)
  }finally{
   setLoading(false)
  }
 }

 const deleteEvent = async(id)=>{
  try{
   await api.delete(`/calendar/${id}`)
   fetchEvents()
  }catch(err){
   console.error(err)
  }
 }

 const rescheduleEvent = async()=>{
  if(!newTime) return

  try{
   await api.post("/reschedule",{
    eventId:rescheduleId,
    newTime
   })

   setRescheduleId(null)
   setNewTime("")
   fetchEvents()

  }catch(err){
   console.error(err)
  }
 }

 if(loading) return <Loader/>

 return(

  <DashboardLayout>

   <div className="space-y-10">

    {/* Header */}

    <div>

     <h1 className="text-3xl font-semibold text-white">
      Interview Calendar
     </h1>

     <p className="text-gray-400 mt-1">
      Manage and track all scheduled interviews
     </p>

    </div>


    {events.length === 0 && (

     <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-gray-400">

      <CalendarDays className="mx-auto mb-3 w-8 h-8 opacity-60"/>

      No interviews scheduled yet

     </div>

    )}


    {/* Cards */}

    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

     {events.map(e=>(

      <div
       key={e._id}
       className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/10 transition"
      >

       {/* Top */}

       <div className="space-y-5">

        <div className="flex items-center justify-between">

         <h3 className="text-sm font-semibold text-gray-200">
          Interview Scheduled
         </h3>

         <CalendarDays className="w-5 h-5 text-indigo-400"/>

        </div>


        {/* Candidate */}

        <div className="space-y-2 text-sm">

         <div className="flex items-center gap-2 text-gray-200">

          <User className="w-4 h-4 text-indigo-400"/>

          {e.candidateName}

         </div>

         <div className="flex items-center gap-2 text-gray-400">

          <Mail className="w-4 h-4"/>

          {e.email}

         </div>

         <div className="flex items-center gap-2 text-gray-400">

          <Briefcase className="w-4 h-4"/>

          {e.interviewType}

         </div>

         <div className="flex items-center gap-2 text-gray-200">

          <Clock className="w-4 h-4 text-indigo-400"/>

          {formatDate(e.time)}

         </div>

        </div>


        {/* Status */}

        <span className="inline-block text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full w-fit">
         {e.status}
        </span>


        {/* Meeting Button */}

        {e.meetingLink && (

         <a
          href={e.meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-2 rounded-lg transition"
         >

          <Video className="w-4 h-4"/>

          Join Meeting

         </a>

        )}

       </div>


       {/* Reschedule */}

       {rescheduleId === e._id && (

        <div className="mt-4 space-y-3">

         <input
          type="datetime-local"
          value={newTime}
          onChange={(e)=>setNewTime(e.target.value)}
          className="bg-slate-900 border border-white/10 rounded-lg p-2 w-full text-sm"
         />

         <button
          onClick={rescheduleEvent}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium"
         >
          Confirm Reschedule
         </button>

        </div>

       )}


       {/* Actions */}

       <div className="flex gap-3 mt-6">

        <button
         onClick={()=>setRescheduleId(e._id)}
         className="flex-1 border border-white/10 hover:bg-white/10 text-sm py-2 rounded-lg transition"
        >
         Reschedule
        </button>

        <button
         onClick={()=>deleteEvent(e._id)}
         className="flex-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm py-2 rounded-lg transition"
        >
         Cancel
        </button>

       </div>

      </div>

     ))}

    </div>

   </div>

  </DashboardLayout>

 )
}