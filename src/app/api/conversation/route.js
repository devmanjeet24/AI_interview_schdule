import { memoryTool } from "@/tools/memoryTool"
import { requireAuth } from "@/lib/authMiddleware"

export async function POST(req){

 const auth = requireAuth(req)

 if(auth.error){
  return Response.json(
   {error:auth.error},
   {status:401}
  )
 }

 try{

  const {conversationId,role,message} = await req.json()

  if(!conversationId || !role || !message){
   return Response.json(
    {error:"conversationId, role, message required"},
    {status:400}
   )
  }

  memoryTool(
   "store",
   conversationId,
   {role,message,timestamp:Date.now()}
  )

  return Response.json({
   message:"Conversation stored"
  })

 }catch(err){

  console.error("Conversation store error:",err)

  return Response.json(
   {error:"Failed to store conversation"},
   {status:500}
  )

 }

}