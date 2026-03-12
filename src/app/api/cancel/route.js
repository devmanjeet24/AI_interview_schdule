import { requireAuth } from "@/lib/authMiddleware"
import { deleteEvent } from "@/tools/calendarStore"

export async function POST(req){

 const auth = requireAuth(req)

 if(auth.error){
  return Response.json(
   {error:auth.error},
   {status:401}
  )
 }

 try{

  const {eventId} = await req.json()

  if(!eventId){
   return Response.json(
    {error:"eventId required"},
    {status:400}
   )
  }

  const event = await deleteEvent(eventId)

  if(!event){
   return Response.json(
    {error:"Event not found"},
    {status:404}
   )
  }

  return Response.json({
   message:"Interview cancelled"
  })

 }catch(err){

  console.error("Cancel API error:",err)

  return Response.json(
   {error:"Cancellation failed"},
   {status:500}
  )

 }

}