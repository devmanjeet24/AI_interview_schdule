import {
 verifyRefreshToken,
 generateAccessToken
} from "@/lib/authMiddleware"

export async function POST(req){

 const {refreshToken} = await req.json()

 if(!refreshToken){
  return Response.json({error:"Refresh token required"},{status:400})
 }

 const user = verifyRefreshToken(refreshToken)

 if(!user){
  return Response.json({error:"Invalid refresh token"},{status:403})
 }

 const accessToken = generateAccessToken(user)

 return Response.json({accessToken})

}