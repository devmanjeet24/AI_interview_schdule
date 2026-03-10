import {
 getAllEvents,
 createEvent
} from "@/tools/calendarStore"

export async function GET(){

 const events = getAllEvents()

 return Response.json({events})

}

export async function POST(req){

 try{

  const {time} = await req.json()

  if(!time){

   return Response.json({
    error:"Time required"
   },{status:400})

  }

  const event = createEvent({time})

  return Response.json({
   message:"Interview scheduled",
   event
  })

 }catch{

  return Response.json({
   error:"Server error"
  },{status:500})

 }

}