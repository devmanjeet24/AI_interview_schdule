"use client"

import { useEffect, useState } from "react"

export default function Calendar(){

 const [events,setEvents] = useState([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  fetch("/api/calendar")
   .then(res=>res.json())
   .then(data=>{
    setEvents(data.events)
    setLoading(false)
   })

 },[])

 if(loading) return <p>Loading...</p>

 return(

  <div>

   <h1>Interview Calendar</h1>

   {events.length === 0 && (
    <p>No interviews scheduled</p>
   )}

   {events.map(e=>(
    <div key={e.id}>

     <p>{e.time}</p>

    </div>
   ))}

  </div>

 )

}