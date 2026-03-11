import {connectDB} from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(req){

 try{

  const {name,email,password} = await req.json()

  if(!name || !email || !password){
   return Response.json({error:"All fields required"},{status:400})
  }

  await connectDB()

  const existing = await User.findOne({email})

  if(existing){
   return Response.json({error:"Email already exists"},{status:400})
  }

  const hash = await bcrypt.hash(password,10)

  const user = await User.create({
   name,
   email,
   password:hash
  })

  return Response.json({
   message:"User registered successfully",
   user:{
    id:user._id,
    name:user.name,
    email:user.email
   }
  })

 }catch(err){

  return Response.json({error:"Server error"},{status:500})

 }

}