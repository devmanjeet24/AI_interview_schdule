import {connectDB} from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req){

 try{

  const {email,password} = await req.json()

  if(!email || !password){

   return Response.json({
    error:"Email and password required"
   },{status:400})

  }

  await connectDB()

  const user = await User.findOne({email})

  if(!user){

   return Response.json({
    error:"User not found"
   },{status:404})

  }

  const valid = await bcrypt.compare(
   password,
   user.password
  )

  if(!valid){

   return Response.json({
    error:"Invalid password"
   },{status:401})

  }

  const token = jwt.sign(
   {id:user._id},
   process.env.JWT_SECRET
  )

  return Response.json({
   message:"Login success",
   token
  })

 }catch(err){

  return Response.json({
   error:"Server error"
  },{status:500})

 }

}