import { google } from "googleapis"
import { saveTokens } from "@/lib/googleAuth"

export async function GET(req){

 try{

  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  if(!code){
   return Response.json(
    { error: "No code received" },
    { status: 400 }
   )
  }

  // ✅ create fresh client (IMPORTANT FIX)
  const client = new google.auth.OAuth2(
   process.env.GOOGLE_CLIENT_ID,
   process.env.GOOGLE_CLIENT_SECRET,
   process.env.GOOGLE_REDIRECT_URI
  )

  const { tokens } = await client.getToken(code)

  // save tokens
  saveTokens(tokens)

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