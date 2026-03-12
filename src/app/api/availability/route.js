import { requireAuth } from "@/lib/authMiddleware"
import { calendarReadTool } from "@/tools/calendarReadTool"

export async function GET(req){

 const auth = requireAuth(req)

 if(auth.error){
  return Response.json(
   {error:auth.error},
   {status:401}
  )
 }

 try{

  const slots = calendarReadTool()

  return Response.json({
   available: slots.length > 0,
   slots
  })

 }catch(err){

  console.error("Availability API error:",err)

  return Response.json(
   {error:"Failed to fetch availability"},
   {status:500}
  )

 }

}