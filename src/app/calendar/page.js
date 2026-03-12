"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import Loader from "@/components/Loader"
import DashboardLayout from "@/components/DashboardLayout"

import {
 Card,
 CardContent,
 CardHeader,
 CardTitle
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { CalendarDays, Clock } from "lucide-react"

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

 // format date for UI

 const formatDate = (dateString)=>{

  const date = new Date(dateString)

  return date.toLocaleString("en-IN",{
   weekday:"short",
   year:"numeric",
   month:"short",
   day:"numeric",
   hour:"2-digit",
   minute:"2-digit"
  })

 }

 if(loading) return <Loader/>

 return(

  <DashboardLayout>

   <div className="space-y-6">

    {/* Header */}

    <div>

     <h1 className="text-2xl font-bold">
      Interview Calendar
     </h1>

     <p className="text-muted-foreground">
      Manage and review your scheduled interviews
     </p>

    </div>

    {/* Empty state */}

    {events.length === 0 && (

     <Card>

      <CardContent className="p-6 text-center text-muted-foreground">

       No interviews scheduled yet.

      </CardContent>

     </Card>

    )}

    {/* Events grid */}

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

     {events.map(e=>(

      <Card key={e._id} className="hover:shadow-lg transition">

       <CardHeader className="flex flex-row items-center justify-between">

        <CardTitle className="text-sm font-medium">
         Interview Slot
        </CardTitle>

        <CalendarDays className="w-5 h-5 text-muted-foreground"/>

       </CardHeader>

       <CardContent className="space-y-4">

        {/* Date */}

        <div className="flex items-center gap-2 text-sm">

         <Clock className="w-4 h-4 text-muted-foreground"/>

         {formatDate(e.time)}

        </div>

        {/* Description */}

        <p className="text-sm text-muted-foreground">

         This interview slot has been reserved in your calendar.
         You can reschedule or cancel it anytime if needed.

        </p>

        {/* Actions */}

        <Button
         variant="destructive"
         size="sm"
         onClick={()=>deleteEvent(e._id)}
        >
         Cancel Interview
        </Button>

       </CardContent>

      </Card>

     ))}

    </div>

   </div>

  </DashboardLayout>

 )

}