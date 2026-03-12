import { memoryTool } from "@/tools/memoryTool"
import { requireAuth } from "@/lib/authMiddleware"

// export async function GET(req,context){
export async function GET(req,context){

 const auth = requireAuth(req)

 if(auth.error){
  return Response.json(
   {error:auth.error},
   {status:401}
  )
 }

 try{

//   const {id} = await context.params
 const params = await context.params
  const id = params.id

  const history = memoryTool("read",id)

  return Response.json({
   conversationId:id,
   history
  })

 }catch(err){

  console.error("Conversation fetch error:",err)

  return Response.json(
   {error:"Failed to fetch conversation"},
   {status:500}
  )

 }

}