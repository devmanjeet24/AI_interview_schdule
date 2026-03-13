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

   const res = await api.get("/calendar")

   setEvents(res.data.events || [])

  }catch(err){

   console.error("Failed to fetch events",err)

  }finally{

   setLoading(false)

  }

 }

 const deleteEvent = async(id)=>{

  try{

   await api.delete(`/calendar/${id}`)

   fetchEvents()

  }catch(err){

   console.error("Delete failed",err)

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

   console.error("Reschedule failed",err)

  }

 }

 if(loading) return <Loader/>

 return(

  <DashboardLayout>

   <div className="space-y-6">

    <div>

     <h1 className="text-2xl font-bold">
      Interview Calendar
     </h1>

     <p className="text-muted-foreground">
      Manage all scheduled interviews
     </p>

    </div>

    {events.length === 0 && (

     <Card>

      <CardContent className="p-6 text-center text-muted-foreground">

       No interviews scheduled yet.

      </CardContent>

     </Card>

    )}

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

     {events.map(e=>(

      <Card key={e._id} className="hover:shadow-lg transition">

       <CardHeader className="flex flex-row items-center justify-between">

        <CardTitle className="text-sm font-medium">
         Interview Scheduled
        </CardTitle>

        <CalendarDays className="w-5 h-5 text-muted-foreground"/>

       </CardHeader>

       <CardContent className="space-y-4">

        {/* Candidate */}

        <div className="flex items-center gap-2 text-sm font-medium">

         <User className="w-4 h-4"/>

         {e.candidateName}

        </div>

        {/* Email */}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">

         <Mail className="w-4 h-4"/>

         {e.email}

        </div>

        {/* Interviewer */}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">

         <User className="w-4 h-4"/>

         Interviewer: {e.interviewer}

        </div>

        {/* Interview Type */}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">

         <Briefcase className="w-4 h-4"/>

         {e.interviewType}

        </div>

        {/* Time */}

        <div className="flex items-center gap-2 text-sm">

         <Clock className="w-4 h-4"/>

         {formatDate(e.time)}

        </div>

        {/* Status */}

        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">

         {e.status}

        </span>

        {/* Meeting Link */}

        {e.meetingLink && (

         <a
          href={e.meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 text-sm underline"
         >

          <Video className="w-4 h-4"/>

          Join Meeting

         </a>

        )}

        {/* Reschedule UI */}

        {rescheduleId === e._id && (

         <div className="space-y-2">

          <input
           type="datetime-local"
           value={newTime}
           onChange={(e)=>setNewTime(e.target.value)}
           className="border rounded p-2 w-full"
          />

          <Button
           size="sm"
           onClick={rescheduleEvent}
          >
           Confirm Reschedule
          </Button>

         </div>

        )}

        {/* Actions */}

        <div className="flex gap-2">

         <Button
          variant="outline"
          size="sm"
          onClick={()=>setRescheduleId(e._id)}
         >
          Reschedule
         </Button>

         <Button
          variant="destructive"
          size="sm"
          onClick={()=>deleteEvent(e._id)}
         >
          Cancel
         </Button>

        </div>

       </CardContent>

      </Card>

     ))}

    </div>

   </div>

  </DashboardLayout>

 )

}