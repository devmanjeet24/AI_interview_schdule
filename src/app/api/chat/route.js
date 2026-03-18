// import { requireAuth } from "@/lib/authMiddleware"
// import { runGraph } from "@/graph/agentGraph"
// import { memoryTool } from "@/tools/memoryTool"

// export async function POST(req){

//  const auth = requireAuth(req)

//  if(auth.error){
//   return Response.json({ error: auth.error }, { status: 401 })
//  }

//  const body = await req.json()

//  const conversationId =
//   body.conversationId || Math.random().toString(36).substring(2,9)


// const result = await runGraph(body.message, auth.user?.id || "default")


//  memoryTool("store", conversationId, {
//   role: "user",
//   message: body.message,
//   timestamp: Date.now()
//  })

//  console.log("Conversation ID:", conversationId)
// console.log("User message:", body.message)


//  memoryTool("store", conversationId, {
//   role: "assistant",
//   message: result.message,
//   timestamp: Date.now()
//  })

//  console.log("Memory after store:", memoryTool("list"))

//  return Response.json({
//   ...result,
//   conversationId
//  })

// }


import { requireAuth } from "@/lib/authMiddleware"
import { runGraph } from "@/graph/agentGraph"
import { memoryTool } from "@/tools/memoryTool"

export async function POST(req){

 const auth = requireAuth(req)

 if(auth.error){
  return Response.json({ error: auth.error }, { status: 401 })
 }

 const body = await req.json()

 // ✅ USE SAME conversationId (or create new)
 const conversationId =
  body.conversationId || crypto.randomUUID()

 // ✅ IMPORTANT: pass conversationId as userId
 const result = await runGraph(body.message, conversationId)

 // store user message
 memoryTool("store", conversationId, {
  role: "user",
  message: body.message,
  timestamp: Date.now()
 })

 // store assistant response
 memoryTool("store", conversationId, {
  role: "assistant",
  message: result.message,
  timestamp: Date.now()
 })

 return Response.json({
  ...result,
  conversationId
 })

}   