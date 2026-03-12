import { requireAuth } from "@/lib/authMiddleware"
import { updateEvent } from "@/tools/calendarStore"

export async function POST(req){

 const auth = requireAuth(req)

 if(auth.error){
  return Response.json(
   {error:auth.error},
   {status:401}
  )
 }

 try{

  const {eventId,newTime} = await req.json()

  if(!eventId || !newTime){
   return Response.json(
    {error:"eventId and newTime required"},
    {status:400}
   )
  }

  const event = await updateEvent(eventId,newTime)

  if(!event){
   return Response.json(
    {error:"Event not found"},
    {status:404}
   )
  }

  return Response.json({
   message:"Interview rescheduled",
   event
  })

 }catch(err){

  console.error("Reschedule API error:",err)

  return Response.json(
   {error:"Reschedule failed"},
   {status:500}
  )

 }

}