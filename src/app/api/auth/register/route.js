import {connectDB} from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(req){

 try{

  const {name,email,password} = await req.json()

  if(!name || !email || !password){

   return Response.json({
    error:"All fields required"
   },{status:400})

  }

  if(password.length < 6){

   return Response.json({
    error:"Password must be 6 characters"
   },{status:400})

  }

  await connectDB()

  const existing = await User.findOne({email})

  if(existing){

   return Response.json({
    error:"Email already exists"
   },{status:400})

  }

  const hash = await bcrypt.hash(password,10)

  const user = await User.create({
   name,
   email,
   password:hash
  })

  return Response.json({
   message:"User created",
   user
  })

 }catch(err){

  return Response.json({
   error:"Server error"
  },{status:500})

 }

}