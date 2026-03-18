import { google } from "googleapis"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import { verifyAccessToken } from "@/lib/authMiddleware"

export async function GET(req){

 try{

  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  // ✅ GET USER FROM TOKEN
  const authHeader = req.headers.get("authorization")

  if(!authHeader){
   return Response.json({ error:"Unauthorized" },{ status:401 })
  }

  const token = authHeader.split(" ")[1]
  const userData = verifyAccessToken(token)

  if(!userData){
   return Response.json({ error:"Invalid token" },{ status:401 })
  }

  const client = new google.auth.OAuth2(
   process.env.GOOGLE_CLIENT_ID,
   process.env.GOOGLE_CLIENT_SECRET,
   process.env.GOOGLE_REDIRECT_URI
  )

  const { tokens } = await client.getToken(code)

  await connectDB()

  // ✅ SAVE TOKENS TO CORRECT USER
  await User.findByIdAndUpdate(
   userData.id,
   { googleTokens: tokens }
  )

  return Response.json({
   message:"Google connected successfully"
  })

 }catch(err){

  console.error("Callback error:",err)

  return Response.json(
   { error:"Google connection failed" },
   { status:500 }
  )

 }

}