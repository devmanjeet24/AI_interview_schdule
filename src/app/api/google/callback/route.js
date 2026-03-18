import { getOAuthClient, saveTokens } from "@/lib/googleAuth"

export async function GET(req){

 const { searchParams } = new URL(req.url)
 const code = searchParams.get("code")

 const client = getOAuthClient()

 const { tokens } = await client.getToken(code)

 // ✅ SAVE TOKENS (important fix)
 saveTokens(tokens)

 return Response.json({
  message:"Google connected successfully"
 })

}