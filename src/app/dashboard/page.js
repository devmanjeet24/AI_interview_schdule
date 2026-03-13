"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"

import DashboardLayout from "@/components/DashboardLayout"
import Loader from "@/components/Loader"

import {
 CalendarDays,
 Clock,
 CheckCircle
} from "lucide-react"

export default function Dashboard(){

 const [events,setEvents] = useState([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  fetchEvents()

 },[])

 const fetchEvents = async()=>{

  try{

   const res = await api.get("/calendar")

   setEvents(res.data.events)

  }catch(err){

   console.error("Dashboard fetch error",err)

  }finally{

   setLoading(false)

  }

 }

 if(loading){
  return (
   <DashboardLayout>
    <Loader/>
   </DashboardLayout>
  )
 }

 const total = events.length

 const now = new Date()

 const upcoming = events.filter(e => new Date(e.time) > now)

 const availableSlots = 3

 return(

  <DashboardLayout>

   <main className="relative min-h-screen bg-[#0f172a] overflow-hidden px-6 py-8 dashboard">

    {/* animated blobs */}

    <div className="blob absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-600 opacity-30 blur-[180px] rounded-full"></div>

    <div className="blob absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-600 opacity-30 blur-[180px] rounded-full"></div>

    <div className="blob absolute top-[40%] left-[40%] w-[350px] h-[350px] bg-blue-600 opacity-20 blur-[160px] rounded-full"></div>

    <div className="relative z-10 space-y-10">

     {/* header */}

     <div>

      <h1 className="text-3xl font-bold text-white">
       Dashboard
      </h1>

      <p className="text-gray-400">
       Overview of your interview scheduling activity
      </p>

     </div>


     {/* stats */}

     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      {/* total */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:-translate-y-1 transition shadow-xl">

       <div className="flex justify-between items-center">

        <p className="text-sm text-gray-300">
         Total Interviews
        </p>

        <div className="p-2 rounded-lg bg-indigo-500/20">

         <CalendarDays className="text-indigo-400"/>

        </div>

       </div>

       <h2 className="text-3xl font-bold text-white mt-4">
        {total}
       </h2>

       <p className="text-xs text-gray-400 mt-1">
        Interviews scheduled in your system
       </p>

      </div>


      {/* upcoming */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:-translate-y-1 transition shadow-xl">

       <div className="flex justify-between items-center">

        <p className="text-sm text-gray-300">
         Upcoming Interviews
        </p>

        <div className="p-2 rounded-lg bg-purple-500/20">

         <Clock className="text-purple-400"/>

        </div>

       </div>

       <h2 className="text-3xl font-bold text-white mt-4">
        {upcoming.length}
       </h2>

       <p className="text-xs text-gray-400 mt-1">
        Interviews scheduled in the future
       </p>

      </div>


      {/* slots */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:-translate-y-1 transition shadow-xl">

       <div className="flex justify-between items-center">

        <p className="text-sm text-gray-300">
         Available Slots
        </p>

        <div className="p-2 rounded-lg bg-green-500/20">

         <CheckCircle className="text-green-400"/>

        </div>

       </div>

       <h2 className="text-3xl font-bold text-white mt-4">
        {availableSlots}
       </h2>

       <p className="text-xs text-gray-400 mt-1">
        Interview slots currently available
       </p>

      </div>

     </div>


     {/* recent interviews */}

     <div>

      <h2 className="text-xl font-semibold text-white mb-4">
       Recent Interviews
      </h2>

      <div className="space-y-4">

       {events.slice(0,5).map(event => (

        <div
         key={event._id}
         className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 flex justify-between items-center hover:bg-white/20 transition"
        >

         <div>

          <p className="font-medium text-white">
           {event.candidateName || "Candidate"}
          </p>

          <p className="text-sm text-gray-400">
           {new Date(event.time).toLocaleString()}
          </p>

         </div>

         <div className="text-sm text-indigo-400">

          {event.status || "Scheduled"}

         </div>

        </div>

       ))}

      </div>

     </div>

    </div>

   </main>

  </DashboardLayout>

 )

}