"use client"

import { useEffect, useState } from "react"

import api from "@/lib/api"

import DashboardLayout from "@/components/DashboardLayout"
import Loader from "@/components/Loader"

import {
 Card,
 CardContent,
 CardHeader,
 CardTitle
} from "@/components/ui/card"

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

 // total interviews

 const total = events.length

 // upcoming interviews

 const now = new Date()

 const upcoming = events.filter(e => new Date(e.time) > now)

 // available slots

 const availableSlots = 3 // from availability tool

 return(

  <DashboardLayout>

   <div className="space-y-10">

    {/* Header */}

    <div>

     <h1 className="text-3xl font-bold">
      Dashboard
     </h1>

     <p className="text-muted-foreground">
      Overview of your interview scheduling activity
     </p>

    </div>

    {/* Stats */}

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

     {/* Total Interviews */}

     <Card className="hover:shadow-md transition">

      <CardHeader className="flex flex-row items-center justify-between">

       <CardTitle className="text-sm font-medium">
        Total Interviews
       </CardTitle>

       <CalendarDays className="h-5 w-5 text-muted-foreground"/>

      </CardHeader>

      <CardContent>

       <div className="text-3xl font-bold">
        {total}
       </div>

       <p className="text-xs text-muted-foreground">
        Interviews scheduled in your system
       </p>

      </CardContent>

     </Card>

     {/* Upcoming */}

     <Card className="hover:shadow-md transition">

      <CardHeader className="flex flex-row items-center justify-between">

       <CardTitle className="text-sm font-medium">
        Upcoming Interviews
       </CardTitle>

       <Clock className="h-5 w-5 text-muted-foreground"/>

      </CardHeader>

      <CardContent>

       <div className="text-3xl font-bold">
        {upcoming.length}
       </div>

       <p className="text-xs text-muted-foreground">
        Interviews scheduled in the future
       </p>

      </CardContent>

     </Card>

     {/* Available Slots */}

     <Card className="hover:shadow-md transition">

      <CardHeader className="flex flex-row items-center justify-between">

       <CardTitle className="text-sm font-medium">
        Available Slots
       </CardTitle>

       <CheckCircle className="h-5 w-5 text-muted-foreground"/>

      </CardHeader>

      <CardContent>

       <div className="text-3xl font-bold">
        {availableSlots}
       </div>

       <p className="text-xs text-muted-foreground">
        Interview slots currently available
       </p>

      </CardContent>

     </Card>

    </div>

    {/* Recent Interviews */}

    <div>

     <h2 className="text-xl font-semibold mb-4">
      Recent Interviews
     </h2>

     <div className="space-y-4">

      {events.slice(0,5).map(event => (

       <Card key={event._id}>

        <CardContent className="p-4 flex justify-between items-center">

         <div>

          <p className="font-medium">
           {event.candidateName || "Candidate"}
          </p>

          <p className="text-sm text-muted-foreground">
           {new Date(event.time).toLocaleString()}
          </p>

         </div>

         <div className="text-sm text-muted-foreground">

          {event.status || "Scheduled"}

         </div>

        </CardContent>

       </Card>

      ))}

     </div>

    </div>

   </div>

  </DashboardLayout>

 )

}