import { memoryTool } from "@/tools/memoryTool"
import { requireAuth } from "@/lib/authMiddleware"

export async function GET(req){

 const auth = requireAuth(req)

 if(auth.error){
  return Response.json({ error: auth.error }, { status: 401 })
 }

 const conversations = memoryTool("list")

 return Response.json({
  conversations
 })

}