import { calendarReadTool } from "@/tools/calendarReadTool"
import { calendarCreateTool } from "@/tools/calendarCreateTool"

export async function GET(){

 const events = calendarReadTool()

 return Response.json({
  events
 })

}

export async function POST(req){

 const body = await req.json()

 const {time} = body

 if(!time){

  return Response.json({
   error:"Time required"
  },{status:400})

 }

 const event = calendarCreateTool({
  time
 })

 return Response.json({
  message:"Interview scheduled",
  event
 })

}