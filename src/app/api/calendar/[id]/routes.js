import {
 getEventById,
 updateEvent,
 deleteEvent
} from "@/tools/calendarStore"

export async function GET(req,{params}){

 const event = getEventById(params.id)

 if(!event){

  return Response.json({
   error:"Event not found"
  },{status:404})

 }

 return Response.json({event})

}

export async function PUT(req,{params}){

 const body = await req.json()

 const {time} = body

 if(!time){

  return Response.json({
   error:"Time required"
  },{status:400})

 }

 const event = updateEvent(params.id,time)

 if(!event){

  return Response.json({
   error:"Event not found"
  },{status:404})

 }

 return Response.json({
  message:"Interview updated",
  event
 })

}

export async function DELETE(req,{params}){

 const success = deleteEvent(params.id)

 if(!success){

  return Response.json({
   error:"Event not found"
  },{status:404})

 }

 return Response.json({
  message:"Interview cancelled"
 })

}