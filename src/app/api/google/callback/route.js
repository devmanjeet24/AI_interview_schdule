import { google } from "googleapis"
import { connectDB } from "@/lib/db"
import User from "@/models/User"

export async function GET(req){

 try{

  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  if(!code){
   return Response.json(
    { error:"No code received" },
    { status:400 }
   )
  }

  const client = new google.auth.OAuth2(
   process.env.GOOGLE_CLIENT_ID,
   process.env.GOOGLE_CLIENT_SECRET,
   process.env.GOOGLE_REDIRECT_URI
  )

  const { tokens } = await client.getToken(code)

  await connectDB()

  // ✅ SIMPLE FIX: latest user update
  const user = await User.findOne().sort({ createdAt: -1 })

  if(!user){
   return Response.json({ error:"User not found" },{ status:404 })
  }

  user.googleTokens = tokens
  await user.save()

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