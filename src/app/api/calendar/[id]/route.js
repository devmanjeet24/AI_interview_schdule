import { requireAuth } from "@/lib/authMiddleware"
import {
 getEventById,
 updateEvent,
 deleteEvent
} from "@/tools/calendarStore"

export async function GET(req,context){

 const {params} = context
 const {id} = await params

 const auth = requireAuth(req)

 if(auth.error){
  return Response.json({error:auth.error},{status:401})
 }

 const event = await getEventById(id)

 if(!event){
  return Response.json({error:"Event not found"},{status:404})
 }

 return Response.json({event})

}

export async function PUT(req,context){

 const {params} = context
 const {id} = await params

 const auth = requireAuth(req)

 if(auth.error){
  return Response.json({error:auth.error},{status:401})
 }

 const {time} = await req.json()

 const event = await updateEvent(id,time)

 if(!event){
  return Response.json({error:"Event not found"},{status:404})
 }

 return Response.json({
  message:"Interview updated",
  event
 })

}

export async function DELETE(req,context){

 const {params} = context
 const {id} = await params

 const auth = requireAuth(req)

 if(auth.error){
  return Response.json({error:auth.error},{status:401})
 }

 const event = await deleteEvent(id)

 if(!event){
  return Response.json({error:"Event not found"},{status:404})
 }

 return Response.json({
  message:"Interview cancelled"
 })

}