import { requireAuth } from "@/lib/authMiddleware"
import {
 getAllEvents,
 createEvent
} from "@/tools/calendarStore"

export async function GET(req){

 const auth = requireAuth(req)

 if(auth.error){
  return Response.json({error:auth.error},{status:401})
 }

 const events = await getAllEvents()

 return Response.json({events})

}

export async function POST(req){

 const auth = requireAuth(req)

 if(auth.error){
  return Response.json({error:auth.error},{status:401})
 }

 const {time} = await req.json()

 if(!time){
  return Response.json({error:"Time required"},{status:400})
 }

 const event = await createEvent({time})

 return Response.json({
  message:"Interview scheduled",
  event
 })

}